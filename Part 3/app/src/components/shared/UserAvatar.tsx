import { makeStyles, tokens, Text, Spinner, mergeClasses } from '@fluentui/react-components';
import { useUserProfile } from '../../hooks/useUserProfile';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  avatarCircle: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    flexShrink: '0',
    overflow: 'hidden',
    border: '1px solid rgba(255,255,255,0.12)',
  },
  photo: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  initials: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, rgba(79,140,255,0.35) 0%, rgba(139,92,246,0.35) 100%)',
    color: '#4F8CFF',
    fontSize: '12px',
    fontWeight: tokens.fontWeightSemibold,
  },
  name: {
    color: tokens.colorNeutralForeground1,
    fontWeight: tokens.fontWeightSemibold,
  },
  errorText: {
    color: tokens.colorNeutralForeground3,
  },
  skeletonCircle: {
    background: 'rgba(255,255,255,0.08)',
    borderRadius: '50%',
    width: '32px',
    height: '32px',
  },
});

function deriveInitials(displayName: string): string {
  const parts = displayName.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export function UserAvatar() {
  const styles = useStyles();
  const { profile, isLoading, error } = useUserProfile();

  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={mergeClasses(styles.avatarCircle, styles.skeletonCircle)} />
        <Spinner size='extra-tiny' />
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className={styles.container}>
        <div className={mergeClasses(styles.avatarCircle, styles.initials)}>?</div>
        <Text size={200} className={styles.errorText}>Unknown user</Text>
      </div>
    );
  }

  return (
    <div className={styles.container} title={`${profile.displayName} — ${profile.jobTitle}`}>
      <div className={styles.avatarCircle}>
        {profile.photoUrl ? (
          <img src={profile.photoUrl} alt={profile.displayName} className={styles.photo} />
        ) : (
          <div className={styles.initials}>{deriveInitials(profile.displayName)}</div>
        )}
      </div>
      <Text size={200} className={styles.name}>{profile.displayName}</Text>
    </div>
  );
}
