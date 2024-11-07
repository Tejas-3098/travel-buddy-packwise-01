import { motion } from "framer-motion";
import { PartyPopper } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

const CompletionPage = ({ onBack }: { onBack: () => void }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ 
          type: "spring",
          stiffness: 260,
          damping: 20 
        }}
      >
        <Card className="w-full max-w-lg mx-auto">
          <CardContent className="pt-6 text-center">
            <motion.div
              animate={{ 
                rotate: [0, 10, -10, 10, 0],
                y: [0, -10, 0]
              }}
              transition={{ 
                duration: 1,
                repeat: Infinity,
                repeatDelay: 3
              }}
              className="inline-block mb-4"
            >
              <PartyPopper className="w-16 h-16 text-primary" />
            </motion.div>
            
            <motion.h2 
              className="text-3xl font-bold mb-4 text-primary"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatDelay: 1
              }}
            >
              Yay! You're all set for your adventure!
            </motion.h2>
            
            <p className="text-muted-foreground mb-6">
              Everything is packed and ready to go. Have an amazing trip!
            </p>
            
            <Button 
              variant="outline"
              onClick={onBack}
              className="mt-4"
            >
              Back to Packing List
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default CompletionPage;