import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { Globe, BrainCircuit } from "lucide-react";
import { Link } from "wouter";

export function Navbar() {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'zh' ? 'en' : 'zh');
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        <Link href="/">
          <div className="flex items-center gap-2 font-bold text-lg cursor-pointer hover:opacity-80 transition-opacity">
            <BrainCircuit className="h-6 w-6 text-primary" />
            <span className="hidden sm:inline-block">
              {language === 'zh' ? '动物智能复习指南' : 'Animal Intelligence Study'}
            </span>
          </div>
        </Link>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={toggleLanguage}
            className="flex items-center gap-2"
          >
            <Globe className="h-4 w-4" />
            <span>{language === 'zh' ? 'English' : '中文'}</span>
          </Button>
        </div>
      </div>
    </nav>
  );
}
