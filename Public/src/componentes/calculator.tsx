import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

const buttons = [
  ["7", "8", "9", "/"],
  ["4", "5", "6", "*"],
  ["1", "2", "3", "-"],
  ["0", ".", "=", "+"]
];

const scientificButtons = [
  ["sin", "cos", "tan", "^"],
  ["log", "ln", "√", "π"],
  ["e", "(", ")", "AC"]
];

export default function Calculator() {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState("basic");

  const handleClick = (value: string) => {
    if (value === "=") {
      try {
        const result = eval(input.replace("^", "**"));
        setInput(result.toString());
      } catch {
        setInput("Error");
      }
    } else if (value === "AC") {
      setInput("");
    } else if (value === "π") {
      setInput((prev) => prev + Math.PI.toFixed(8));
    } else if (value === "e") {
      setInput((prev) => prev + Math.E.toFixed(8));
    } else if (value === "√") {
      try {
        setInput((prev) => Math.sqrt(eval(prev)).toString());
      } catch {
        setInput("Error");
      }
    } else if (["sin", "cos", "tan", "log", "ln"].includes(value)) {
      try {
        const num = eval(input);
        let result;
        switch (value) {
          case "sin":
            result = Math.sin(num);
            break;
          case "cos":
            result = Math.cos(num);
            break;
          case "tan":
            result = Math.tan(num);
            break;
          case "log":
            result = Math.log10(num);
            break;
          case "ln":
            result = Math.log(num);
            break;
        }
        setInput(result.toString());
      } catch {
        setInput("Error");
      }
    } else {
      setInput((prev) => prev + value);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-purple-800 to-pink-700 p-4">
      <Card className="w-full max-w-md shadow-2xl backdrop-blur-sm bg-white/10 border-white/20 border">
        <CardContent className="p-6">
          <Tabs value={mode} onValueChange={setMode} className="w-full">
            <TabsList className="grid grid-cols-2 mb-4">
              <TabsTrigger value="basic">Basic</TabsTrigger>
              <TabsTrigger value="scientific">Scientific</TabsTrigger>
            </TabsList>
            <Input
              value={input}
              className="mb-4 text-right text-xl font-mono bg-white/20 text-white placeholder:text-white border-white/30"
              readOnly
              placeholder="0"
            />
            <TabsContent value="basic">
              <div className="grid grid-cols-4 gap-2">
                {buttons.flat().map((btn) => (
                  <Button
                    key={btn}
                    variant="outline"
                    className="text-xl p-6 bg-white/20 border-white/30 text-white hover:bg-white/30"
                    onClick={() => handleClick(btn)}
                  >
                    {btn}
                  </Button>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="scientific">
              <div className="grid grid-cols-4 gap-2 mb-4">
                {scientificButtons.flat().map((btn) => (
                  <Button
                    key={btn}
                    variant="outline"
                    className="text-md p-4 bg-white/20 border-white/30 text-white hover:bg-white/30"
                    onClick={() => handleClick(btn)}
                  >
                    {btn}
                  </Button>
                ))}
              </div>
              <div className="grid grid-cols-4 gap-2">
                {buttons.flat().map((btn) => (
                  <Button
                    key={btn}
                    variant="outline"
                    className="text-xl p-6 bg-white/20 border-white/30 text-white hover:bg-white/30"
                    onClick={() => handleClick(btn)}
                  >
                    {btn}
                  </Button>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
   }
