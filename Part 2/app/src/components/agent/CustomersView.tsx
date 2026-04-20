import { makeStyles } from '@fluentui/react-components';
import { useCustomers } from '../../hooks/useCustomers';
import { CustomerCard } from './CustomerCard';

const useStyles = makeStyles({
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
    gap: '16px',
  },
});

export function CustomersView() {
  const styles = useStyles();
  const { all } = useCustomers();

  return (
    <div className={styles.grid}>
      {all.map(customer => (
        <CustomerCard key={customer.id} customer={customer} />
      ))}
    </div>
  );
}
