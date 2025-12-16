import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export default function RightDrawer({ open, onClose, children }) {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/30 z-40"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Drawer */}
          <motion.div
            className="fixed right-0 top-0 h-full w-[420px] bg-white z-50 shadow-xl"
            initial={{ x: 420 }}
            animate={{ x: 0 }}
            exit={{ x: 420 }}
            transition={{ type: "tween", duration: 0.3 }}
          >
            <div className="h-16 flex items-center justify-between px-4 border-b">
              <h3 className="font-semibold">Add User</h3>
              <button onClick={onClose}>
                <X />
              </button>
            </div>

            <div className="p-4 overflow-y-auto h-[calc(100%-64px)]">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
