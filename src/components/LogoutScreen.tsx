import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { useNavigate } from "react-router-dom";

const LogoutScreen = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex items-center justify-center bg-background p-4"
    >
      <Card className="w-full max-w-md p-6">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-primary mb-2">Logged Out</h1>
          <p className="text-muted-foreground mb-6">You have successfully logged out</p>
          <Button 
            onClick={() => navigate("/auth")}
            className="w-full"
          >
            Sign In Again
          </Button>
        </div>
      </Card>
    </motion.div>
  );
};

export default LogoutScreen;