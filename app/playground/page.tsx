"use client";

import React, { useState, useRef, useEffect } from "react";

// ==========================================
// 1. MODAL DIALOG COMPONENT (Focus Trap + Escape Key)
// ==========================================
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

function Modal({ isOpen, onClose, title, children }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement;
      // Focus the modal wrapper
      setTimeout(() => modalRef.current?.focus(), 50);
    } else {
      previousFocusRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === "Escape") {
        onClose();
        return;
      }

      if (e.key === "Tab" && modalRef.current) {
        const focusables = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div
        ref={modalRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className="w-full max-w-md bg-[#1e293b] border border-slate-700 text-white rounded-xl p-6 shadow-2xl space-y-4 focus:outline-none"
      >
        <div className="flex justify-between items-center">
          <h3 id="modal-title" className="text-xl font-bold text-[#38bdf8]">
            {title}
          </h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded focus:ring-2 focus:ring-[#38bdf8]"
            aria-label="Close dialog"
          >
            ✕
          </button>
        </div>
        <div>{children}</div>
        <div className="flex justify-end pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#38bdf8] text-slate-900 font-semibold rounded-lg hover:bg-sky-400 focus:ring-2 focus:ring-white"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 2. ACCESSIBLE TABS COMPONENT (Arrow Key Navigation)
// ==========================================
interface TabItem {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface TabsProps {
  items: TabItem[];
}

function Tabs({ items }: TabsProps) {
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    let nextIdx = index;
    if (e.key === "ArrowRight") {
      nextIdx = (index + 1) % items.length;
    } else if (e.key === "ArrowLeft") {
      nextIdx = (index - 1 + items.length) % items.length;
    } else if (e.key === "Home") {
      nextIdx = 0;
    } else if (e.key === "End") {
      nextIdx = items.length - 1;
    } else {
      return;
    }
    e.preventDefault();
    setActiveIdx(nextIdx);
    tabRefs.current[nextIdx]?.focus();
  };

  return (
    <div className="space-y-4">
      <div
        role="tablist"
        aria-label="Component Navigation"
        className="flex space-x-2 border-b border-slate-700 pb-2"
      >
        {items.map((tab, idx) => (
          <button
            key={tab.id}
            ref={(el) => {
              tabRefs.current[idx] = el;
            }}
            role="tab"
            aria-selected={activeIdx === idx}
            aria-controls={`panel-${tab.id}`}
            id={`tab-${tab.id}`}
            tabIndex={activeIdx === idx ? 0 : -1}
            onClick={() => setActiveIdx(idx)}
            onKeyDown={(e) => handleKeyDown(e, idx)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              activeIdx === idx
                ? "bg-[#38bdf8] text-slate-950 font-bold"
                : "text-slate-400 hover:text-white hover:bg-slate-800"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {items.map((tab, idx) => (
        <div
          key={tab.id}
          id={`panel-${tab.id}`}
          role="tabpanel"
          aria-labelledby={`tab-${tab.id}`}
          hidden={activeIdx !== idx}
          className="p-4 bg-[#0f172a] rounded-lg border border-slate-800 text-slate-300"
        >
          {tab.content}
        </div>
      ))}
    </div>
  );
}

// ==========================================
// 3. DISCLOSURE COMPONENT (Accordion)
// ==========================================
interface DisclosureProps {
  title: string;
  children: React.ReactNode;
}

function Disclosure({ title, children }: DisclosureProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="border border-slate-700 rounded-lg overflow-hidden">
      <button
        type="button"
        aria-expanded={isOpen}
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-4 bg-[#1e293b] text-left text-white font-semibold hover:bg-slate-700/50 focus:ring-2 focus:ring-[#38bdf8]"
      >
        <span>{title}</span>
        <span className="text-[#38bdf8] font-mono">{isOpen ? "▲" : "▼"}</span>
      </button>
      {isOpen && (
        <div className="p-4 bg-[#0f172a] text-slate-300 text-sm border-t border-slate-700">
          {children}
        </div>
      )}
    </div>
  );
}

// ==========================================
// PLAYGROUND MAIN PAGE
// ==========================================
export default function PlaygroundPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const tabItems: TabItem[] = [
    {
      id: "aria-info",
      label: "W3C ARIA Spec",
      content:
        "W3C ARIA standards define precise keyboard patterns (Tab, Shift+Tab, Arrows, Escape) to ensure screen-reader & keyboard accessibility.",
    },
    {
      id: "focus-info",
      label: "Focus Management",
      content:
        "Modals must trap focus inside their boundary while open, and explicitly restore focus to the trigger button upon closure.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0f172a] text-[#f8fafc] p-8 md:p-16 max-w-4xl mx-auto space-y-10">
      <div>
        <h1 className="text-3xl font-bold text-[#38bdf8] mb-2">
          Component Playground & ARIA Testing
        </h1>
        <p className="text-slate-400">
          Scratch-built accessible React + TypeScript components following W3C APG standards.
        </p>
      </div>

      {/* Modal Section */}
      <section className="p-6 bg-[#1e293b] rounded-xl border border-slate-700 space-y-4">
        <h2 className="text-xl font-semibold">1. Modal Dialog Pattern</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-[#38bdf8] text-slate-950 font-bold rounded-lg hover:bg-sky-400"
        >
          Open Accessible Modal
        </button>

        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Accessible Modal Dialog"
        >
          <p className="text-slate-300 text-sm">
            This modal traps focus using <code>Shift+Tab</code> and <code>Tab</code> cycling.
            Pressing <kbd className="px-1.5 py-0.5 bg-slate-800 rounded border border-slate-600">Esc</kbd> closes it and restores focus.
          </p>
        </Modal>
      </section>

      {/* Tabs Section */}
      <section className="p-6 bg-[#1e293b] rounded-xl border border-slate-700 space-y-4">
        <h2 className="text-xl font-semibold">2. Tabs Pattern (Arrow Navigation)</h2>
        <p className="text-xs text-slate-400">Use Left/Right arrow keys to navigate tabs.</p>
        <Tabs items={tabItems} />
      </section>

      {/* Disclosure Section */}
      <section className="p-6 bg-[#1e293b] rounded-xl border border-slate-700 space-y-4">
        <h2 className="text-xl font-semibold">3. Disclosure Pattern</h2>
        <Disclosure title="What is the difference between custom components and Radix/shadcn?">
          Custom components require explicit state wiring and event listeners for focus management, whereas primitive libraries handle cross-browser edge cases, React Portals, and screen reader announcements automatically.
        </Disclosure>
      </section>
    </div>
  );
}