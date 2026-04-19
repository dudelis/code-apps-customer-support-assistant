import { useState } from 'react';
import {
  Button,
  Input,
  Label,
  makeStyles,
  Spinner,
  tokens,
} from '@fluentui/react-components';
import { PlayCircleRegular } from '@fluentui/react-icons';
import { runCodeAppFlow } from '../../services/flows';

const useStyles = makeStyles({
  panel: {
    background: 'var(--bg-glass)',
    border: '1px solid var(--border-glass)',
    borderRadius: '12px',
    padding: '20px 24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  title: {
    margin: 0,
    fontSize: '13px',
    fontWeight: '600',
    color: 'var(--text-muted)',
    letterSpacing: '0.5px',
    textTransform: 'uppercase',
  },
  row: {
    display: 'flex',
    gap: '12px',
    alignItems: 'flex-end',
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    flex: 1,
  },
  output: {
    fontSize: '13px',
    color: 'var(--text-muted)',
    background: 'rgba(0,0,0,0.2)',
    borderRadius: '6px',
    padding: '8px 12px',
  },
  outputValue: {
    color: 'var(--text-primary)',
    fontWeight: '500',
  },
  error: {
    fontSize: '13px',
    color: tokens.colorPaletteRedForeground1,
    padding: '8px 12px',
    background: 'rgba(255,0,0,0.06)',
    borderRadius: '6px',
  },
});

export function FlowPanel() {
  const styles = useStyles();
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [output, setOutput] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleRun() {
    setLoading(true);
    setError(null);
    setOutput(null);
    try {
      const result = await runCodeAppFlow({ input1: input1, input2: input2 });
      setOutput(result.output);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.panel}>
      <p className={styles.title}>Calling the Flow Directly</p>
      <div className={styles.row}>
        <div className={styles.field}>
          <Label htmlFor="flow-input1">input1</Label>
          <Input
            id="flow-input1"
            value={input1}
            onChange={(_, d) => setInput1(d.value)}
            placeholder="Enter input1"
          />
        </div>
        <div className={styles.field}>
          <Label htmlFor="flow-input2">input2</Label>
          <Input
            id="flow-input2"
            value={input2}
            onChange={(_, d) => setInput2(d.value)}
            placeholder="Enter input2"
          />
        </div>
        <Button
          appearance="primary"
          icon={loading ? <Spinner size="tiny" /> : <PlayCircleRegular />}
          disabled={loading || !input1 || !input2}
          onClick={() => { void handleRun(); }}
        >
          Run Flow
        </Button>
      </div>
      {output !== null && (
        <div className={styles.output}>
          output: <span className={styles.outputValue}>{output}</span>
        </div>
      )}
      {error !== null && (
        <div className={styles.error}>{error}</div>
      )}
    </div>
  );
}
