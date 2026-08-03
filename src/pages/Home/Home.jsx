import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import Button from "../../components/Button/Button";
import Card from "../../components/Card/Card";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-black flex items-center justify-center px-6">

      {/* Background Glow */}
      <div className="absolute w-[500px] h-[500px] bg-cyan-500/20 blur-[180px] rounded-full -top-40 -left-32"></div>

      <div className="absolute w-[450px] h-[450px] bg-purple-500/20 blur-[180px] rounded-full bottom-0 right-0"></div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <Card>

          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-6xl font-black text-cyan-400 text-center"
          >
            AChat 🚀
          </motion.h1>

          <p className="text-center text-slate-300 mt-5 text-xl">
            Private • Secure • Temporary
          </p>

          <p className="text-center text-slate-400 mt-5 leading-8">
            Chat freely with temporary rooms.
          </p>

          <div className="space-y-4 mt-10">

            <Button
              title="🚀 Create Room"
              onClick={() => navigate("/create")}
            />

            <Button
              title="🔑 Join Room"
              type="secondary"
              onClick={() => navigate("/join")}
            />

          </div>

        </Card>
      </motion.div>

    </div>
  );
}

export default Home;