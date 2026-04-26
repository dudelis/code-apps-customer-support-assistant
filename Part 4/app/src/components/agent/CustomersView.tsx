import { useState } from 'react';
import { makeStyles, Button, Spinner, MessageBar } from '@fluentui/react-components';
import { useCustomers } from '../../hooks/useCustomers';
import { CustomerCard } from './CustomerCard';
import { NewCustomerDialog } from './NewCustomerDialog';

const useStyles = makeStyles({
  toolbar: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: '12px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
    gap: '16px',
  },
  loadingWrapper: {
    display: 'flex',
    justifyContent: 'center',
    padding: '48px 0',
  },
});

export function CustomersView() {
  const styles = useStyles();
  const { all, isLoading, error } = useCustomers();
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      <div className={styles.toolbar}>
        <Button appearance="primary" onClick={() => setDialogOpen(true)}>New Customer</Button>
      </div>

      {isLoading ? (
        <div className={styles.loadingWrapper}>
          <Spinner label="Loading customers…" />
        </div>
      ) : error ? (
        <MessageBar intent="error">{error}</MessageBar>
      ) : (
        <div className={styles.grid}>
          {all.map(customer => (
            <CustomerCard key={customer.id} customer={customer} />
          ))}
        </div>
      )}

      <NewCustomerDialog open={dialogOpen} onClose={() => setDialogOpen(false)} />
    </>
  );
}
