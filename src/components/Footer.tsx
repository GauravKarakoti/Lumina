import { Instagram, Youtube, Mail, Heart } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const Footer = () => {
  return (
    <footer className="border-t border-border/50 py-12 bg-background/50 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-1 md:col-span-2 space-y-4">
            <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary inline-block">
              Lumina
            </h3>
            <p className="text-muted-foreground max-w-sm">
              The advanced ecosystem for students who demand more. 
              Precision tools for academic excellence.
            </p>
            <div className="flex gap-4 pt-2">
              <a
                href="https://www.instagram.com/gaurav._.karakoti"
                className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="mailto:karakotigaurav12@gmail.com"
                className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-colors"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Platform</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Dialog>
                  <DialogTrigger asChild>
                    <button className="hover:text-primary transition-colors">
                      About Lumina
                    </button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>About Lumina</DialogTitle>
                      <DialogDescription className="pt-4">
                        Lumina is an academic acceleration platform built for the modern scholar.
                      </DialogDescription>
                      <DialogDescription>
                        We provide an integrated environment for notes, research, and project management. 
                        Our mission is to reduce friction in the learning process.
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              </li>
              <li>
                <a
                  href="/learn"
                  className="hover:text-primary transition-colors"
                >
                  Courses
                </a>
              </li>
              <li>
                <a
                  href="/select-course"
                  className="hover:text-primary transition-colors"
                >
                  Notes
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Legal & Support</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Dialog>
                  <DialogTrigger asChild>
                    <button className="hover:text-primary transition-colors">
                      Terms & Conditions
                    </button>
                  </DialogTrigger>
                  <DialogContent className="max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Terms and Conditions</DialogTitle>
                      <DialogDescription className="pt-4">
                        By using Lumina, you agree to our Terms & Conditions.
                      </DialogDescription>
                      <DialogDescription>
                        All study materials, notes, videos, graphics, and
                        content available on Lumina are the intellectual
                        property of Lumina and are for
                        personal educational use only.
                      </DialogDescription>
                      <DialogDescription>
                        Unauthorized copying, distribution, or commercial use is
                        strictly prohibited.
                      </DialogDescription>
                      <DialogDescription className="pt-4">
                        Lumina is not responsible for any academic loss,
                        technical issues, or third-party website content.
                      </DialogDescription>
                      <DialogDescription>
                        Paid services are non-refundable unless clearly stated.
                      </DialogDescription>
                      <DialogDescription>
                        We reserve the right to modify or suspend services and
                        accounts that violate policies.
                      </DialogDescription>
                      <DialogDescription className="pt-4">
                        For any support or queries, email us at:{" "}
                        <a
                          href="mailto:karakotigaurav12@gmail.com"
                          className="text-blue-500"
                        >
                          karakotigaurav12@gmail.com
                        </a>
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              </li>
              <li>
                <Dialog>
                  <DialogTrigger asChild>
                    <button className="hover:text-primary transition-colors">
                      Privacy Policy
                    </button>
                  </DialogTrigger>
                  <DialogContent className="max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Privacy Policy</DialogTitle>
                      <DialogDescription className="pt-4">
                        Lumina values your privacy. We collect basic
                        information like name, email, and usage data to improve
                        user experience and provide services.
                      </DialogDescription>
                      <DialogDescription>
                        We do not sell or share personal data with unauthorized
                        parties.
                      </DialogDescription>
                      <DialogDescription>
                        Data is protected under secure systems and used only to
                        manage your account, communications, and service
                        improvement.
                      </DialogDescription>
                      <DialogDescription className="pt-4">
                        We use cookies to enhance site functionality.
                      </DialogDescription>
                      <DialogDescription>
                        You can request data deletion by contacting support.
                      </DialogDescription>
                      <DialogDescription className="pt-4">
                        Updates to this policy will be posted here. Continued
                        use implies acceptance.
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              </li>
              <li>
                <a
                  href="mailto:karakotigaurav@gmail.com"
                  className="hover:text-primary transition-colors"
                >
                  Help Center
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/50 pt-8 text-center">
          <p className="text-sm text-muted-foreground mb-4 max-w-4xl mx-auto">
            Disclaimer: Resources hosted on Lumina are for educational utility. 
          </p>
          <div className="flex flex-col items-center justify-center gap-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <span>
                © {new Date().getFullYear()} Lumina. All rights reserved.
              </span>
            </div>
            <div className="flex gap-4 mt-2">
              <span>
                Created by{" "}
                <a
                  href="https://github.com/GauravKarakoti"
                  className="text-secondary hover:text-primary transition-colors"
                >
                  Gaurav Karakoti
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
