import { useState } from 'react';
import {
  Dialog, DialogSurface, DialogTitle, DialogBody, DialogContent, DialogActions,
  Button, Field, Input, makeStyles,
} from '@fluentui/react-components';
import { useCustomers } from '../../hooks/useCustomers';
import type { NewCustomerInput } from '../../services/dataverseService';

interface NewCustomerDialogProps {
  open: boolean;
  onClose: () => void;
}

const useStyles = makeStyles({
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    minWidth: '420px',
    paddingTop: '8px',
  },
});

export function NewCustomerDialog({ open, onClose }: NewCustomerDialogProps) {
  const styles = useStyles();
  const { createCustomer } = useCustomers();

  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const reset = () => {
    setName('');
    setCompany('');
    setRole('');
    setEmail('');
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleSubmit = async () => {
    if (!name.trim()) return;
    setIsSubmitting(true);
    try {
      const input: NewCustomerInput = {
        name: name.trim(),
        company: company.trim() || undefined,
        role: role.trim() || undefined,
        email: email.trim() || undefined,
      };
      await createCustomer(input);
      handleClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(_, data) => { if (!data.open) handleClose(); }}>
      <DialogSurface>
        <DialogBody>
          <DialogTitle>New Customer</DialogTitle>
          <DialogContent>
            <div className={styles.form}>
              <Field label="Name" required>
                <Input
                  value={name}
                  onChange={(_, d) => setName(d.value)}
                  placeholder="Full name…"
                  autoFocus
                />
              </Field>
              <Field label="Company">
                <Input
                  value={company}
                  onChange={(_, d) => setCompany(d.value)}
                  placeholder="Company name…"
                />
              </Field>
              <Field label="Role">
                <Input
                  value={role}
                  onChange={(_, d) => setRole(d.value)}
                  placeholder="Job title or role…"
                />
              </Field>
              <Field label="Email">
                <Input
                  type="email"
                  value={email}
                  onChange={(_, d) => setEmail(d.value)}
                  placeholder="email@company.com"
                />
              </Field>
            </div>
          </DialogContent>
          <DialogActions>
            <Button appearance="secondary" onClick={handleClose} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button
              appearance="primary"
              onClick={handleSubmit}
              disabled={!name.trim() || isSubmitting}
            >
              {isSubmitting ? 'Creating…' : 'Create Customer'}
            </Button>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
}
