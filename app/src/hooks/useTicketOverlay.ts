import { createContext, useContext, useState, useCallback } from 'react';
import type { OverlayTab } from '../types';

interface TicketOverlayState {
  isOpen: boolean;
  ticketId: string | null;
  activeTab: OverlayTab;
  openOverlay: (ticketId: string, tab?: OverlayTab) => void;
  closeOverlay: () => void;
  setTab: (tab: OverlayTab) => void;
}

export const TicketOverlayContext = createContext<TicketOverlayState>({
  isOpen: false,
  ticketId: null,
  activeTab: 'summary',
  openOverlay: () => {},
  closeOverlay: () => {},
  setTab: () => {},
});

export function useTicketOverlayState(): TicketOverlayState {
  const [isOpen, setIsOpen] = useState(false);
  const [ticketId, setTicketId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<OverlayTab>('summary');

  const openOverlay = useCallback((id: string, tab: OverlayTab = 'summary') => {
    setTicketId(id);
    setActiveTab(tab);
    setIsOpen(true);
  }, []);

  const closeOverlay = useCallback(() => {
    setIsOpen(false);
    setTicketId(null);
  }, []);

  const setTab = useCallback((tab: OverlayTab) => setActiveTab(tab), []);

  return { isOpen, ticketId, activeTab, openOverlay, closeOverlay, setTab };
}

export function useTicketOverlay() {
  return useContext(TicketOverlayContext);
}
