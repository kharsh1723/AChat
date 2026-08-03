import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import Card from "../../components/Card/Card";

function CreateRoom() {
  const navigate = useNavigate();

  const roomCode = Math.random()
    .toString(36)
    .substring(2, 8)
    .toUpperCase();

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-6">

      <Card>

        <h1 className="text-4xl font-bold text-cyan-400 text-center">
          Room Created 🎉
        </h1>

        <p className="text-center text-slate-400 mt-6">
          Share this room code
        </p>

        <h2 className="text-center text-5xl tracking-widest text-white mt-4">
          {roomCode}
        </h2>

        <div className="mt-10">

          <Button
            title="Enter Chat"
            onClick={() => navigate("/chat")}
          />

        </div>

      </Card>

    </div>
  );
}

export default CreateRoom;