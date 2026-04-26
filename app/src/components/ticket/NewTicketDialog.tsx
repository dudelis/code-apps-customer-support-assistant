import { useState } from 'react';
import {
  Dialog, DialogSurface, DialogTitle, DialogBody, DialogContent, DialogActions,
  Button, Field, Input, Select, Textarea, makeStyles,
} from '@fluentui/react-components';
import { useTickets } from '../../hooks/useTickets';
import { useCustomers } from '../../hooks/useCustomers';
import type { Priority } from '../../types';
import type { NewTicketInput } from '../../services/dataverseService';

interface NewTicketDialogProps {
  open: boolean;
  onClose: () => void;
}

const PRIORITIES: Priority[] = ['Low', 'Medium', 'High', 'Critical'];

const useStyles = makeStyles({
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    minWidth: '420px',
    paddingTop: '8px',
  },
});

export function NewTicketDialog({ open, onClose }: NewTicketDialogProps) {
  const styles = useStyles();
  const { createTicket } = useTickets();
  const { all: customers } = useCustomers();

  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState<Priority>('Medium');
  const [customerId, setCustomerId] = useState('');
  const [summary, setSummary] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const reset = () => {
    setTitle('');
    setPriority('Medium');
    setCustomerId('');
    setSummary('');
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleSubmit = async () => {
    if (!title.trim()) return;
    setIsSubmitting(true);
    try {
      const input: NewTicketInput = {
        title: title.trim(),
        priority,
        customerId: customerId || undefined,
        summary: summary.trim() || undefined,
      };
      await createTicket(input);
      handleClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(_, data) => { if (!data.open) handleClose(); }}>
      <DialogSurface>
        <DialogBody>
          <DialogTitle>New Ticket</DialogTitle>
          <DialogContent>
            <div className={styles.form}>
              <Field label="Title" required>
                <Input
                  value={title}
                  onChange={(_, d) => setTitle(d.value)}
                  placeholder="Describe the issue…"
                  autoFocus
                />
              </Field>
              <Field label="Priority">
                <Select value={priority} onChange={(_, d) => setPriority(d.value as Priority)}>
                  {PRIORITIES.map(p => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </Select>
              </Field>
              <Field label="Customer">
                <Select value={customerId} onChange={(_, d) => setCustomerId(d.value)}>
                  <option value="">— None —</option>
                  {customers.map(c => (
                    <option key={c.id} value={c.id}>{c.name} · {c.company}</option>
                  ))}
                </Select>
              </Field>
              <Field label="Summary">
                <Textarea
                  value={summary}
                  onChange={(_, d) => setSummary(d.value)}
                  placeholder="Optional summary…"
                  rows={3}
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
              disabled={!title.trim() || isSubmitting}
            >
              {isSubmitting ? 'Creating…' : 'Create Ticket'}
            </Button>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
}
