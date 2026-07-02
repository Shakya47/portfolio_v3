import React, { useState, useEffect } from 'react';
import { PipWrapper, PipTrigger } from '@pip-it-up/react';
import { Trash2, Maximize2 } from 'lucide-react';

export default function PipLiveDemo() {
  const [isSupported, setIsSupported] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [tasks, setTasks] = useState([
    { id: 1, text: "Optimize Astro bundle sizes", completed: true },
    { id: 2, text: "Implement @pip-it-up/react demo", completed: false },
    { id: 3, text: "Achieve 100/100 Lighthouse score", completed: false }
  ]);
  const [newTaskText, setNewTaskText] = useState("");
  const [isSimulatedPip, setIsSimulatedPip] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    setIsSupported(typeof window !== 'undefined' && 'documentPictureInPicture' in window);
  }, []);

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskText.trim()) return;
    setTasks([
      ...tasks,
      { id: Date.now(), text: newTaskText.trim(), completed: false }
    ]);
    setNewTaskText("");
  };

  const toggleTask = (id: number) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  if (!isMounted) {
    return (
      <div className="w-full max-w-sm p-4 brutal-border flex flex-col gap-3 bg-zinc-50 dark:bg-zinc-950 font-mono text-xs text-center border-dashed">
        <span>Loading Interactive Demo...</span>
      </div>
    );
  }

  const DemoContent = () => (
    <div className="bg-white dark:bg-zinc-950 p-4 brutal-border flex flex-col gap-3 w-full max-w-xs text-light-border dark:text-dark-border">
      <div className="flex justify-between items-center border-b-2 border-current pb-2 mb-1">
        <h3 className="font-mono font-black text-sm tracking-wide">TASK MONITOR</h3>
      </div>

      <form onSubmit={handleAddTask} className="flex gap-2">
        <input
          type="text"
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
          placeholder="New task..."
          className="brutal-border-sm px-2 py-1 font-mono text-xs w-full focus:outline-none bg-zinc-50 dark:bg-zinc-900 border-current"
        />
        <button
          type="submit"
          className="brutal-border-sm bg-[#2563EB] text-white px-3 font-black text-xs hover:scale-105 active:scale-95 border-current"
        >
          ADD
        </button>
      </form>

      <ul className="flex flex-col gap-2 max-h-48 overflow-y-auto">
        {tasks.map(task => (
          <li
            key={task.id}
            className="flex items-center justify-between brutal-border-sm p-2 text-xs font-mono bg-zinc-50 dark:bg-zinc-900 border-current"
          >
            <div className="flex items-center gap-2 cursor-pointer select-none" onClick={() => toggleTask(task.id)}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => { }}
                className="accent-[#2563EB] w-4 h-4 cursor-pointer"
              />
              <span className={task.completed ? "line-through text-zinc-400 dark:text-zinc-500" : "font-semibold"}>
                {task.text}
              </span>
            </div>
            <button
              onClick={() => deleteTask(task.id)}
              className="text-red-500 hover:text-red-700 p-0.5 hover:scale-110"
              aria-label="Delete Task"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </li>
        ))}
      </ul>

      <div className="text-[10px] font-mono text-zinc-500 border-t border-dashed border-current pt-2 mt-1">
        Try modifying tasks in either window — states are reactive and fully preserved.
      </div>
    </div>
  );

  return (
    <div className="w-full flex flex-col items-center py-4 bg-zinc-50 dark:bg-zinc-900/10">
      {isSupported ? (
        <PipWrapper>
          <div className="relative group flex flex-col items-center w-full max-w-xs">
            <DemoContent />
            <div className="mt-4 w-full">
              <PipTrigger>
                <button
                  className="w-full brutal-border-sm brutal-shadow-sm brutal-btn-hover bg-[#2563EB] text-white py-2 font-mono text-xs font-black uppercase flex items-center justify-center gap-1.5 border-current"
                  title="Pop component out into floating PiP window"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>PIP IT UP</span>
                </button>
              </PipTrigger>
            </div>
          </div>
        </PipWrapper>
      ) : (
        <div className="w-full max-w-xs flex flex-col gap-3 items-center">
          {isSimulatedPip ? (
            <div className="fixed bottom-6 right-6 z-50 shadow-2xl animate-fade-in-up">
              <div className="relative">
                <DemoContent />
                <button
                  onClick={() => setIsSimulatedPip(false)}
                  className="absolute top-2 right-2 brutal-border-sm bg-red-500 text-white px-2 py-0.5 font-mono text-[9px] font-bold border-current hover:bg-red-600"
                >
                  CLOSE
                </button>
              </div>
            </div>
          ) : (
            <DemoContent />
          )}

          <div className="flex flex-col gap-2 w-full">
            <button
              onClick={() => setIsSimulatedPip(!isSimulatedPip)}
              className="w-full brutal-border-sm brutal-shadow-sm brutal-btn-hover bg-[#2563EB] text-white py-2 font-mono text-xs font-black uppercase flex items-center justify-center gap-1.5 border-current"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span>{isSimulatedPip ? "MINIMIZE PIP" : "SIMULATE PIP"}</span>
            </button>
            <p className="text-[9px] font-mono text-zinc-500 text-center leading-tight">
              ⚠️ Native Document PiP requires Chrome. Simulated PiP active here.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
