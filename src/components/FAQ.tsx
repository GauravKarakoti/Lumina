import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqData = [
    {
      question: "What is Studyflow?",
      answer: "Studyflow is an educational platform providing notes, PYQs, assignments, PDFs, short learning videos, community guidance, internships, and skill-based learning opportunities for students.",
    },
    {
      question: "Is StudyFlow free to use?",
      answer: "Yes, many resources like basic notes and guidance are free. Some premium materials and courses may be paid.",
    },
    {
      question: "Which subjects & semesters are available?",
      answer: "We provide content for Engineering (IPU / B.Tech / Diploma / CS / IT / ECE etc.)",
    },
    {
      question: "Are the notes handwritten or typed?",
      answer: "We provide both handwritten and fully typed formatted notes depending on availability and subject requirement.",
    },
    {
      question: "How can I request new notes or report an issue?",
      answer: "You can contact us through 📧 Email:studyflowteams@gmail.com and 📱 Instagram: @studyflow.in",
    },
    {
      question: "Will Studyflow launch an app?",
      answer: "Yes, the Studyflow mobile app is under development and will launch soon.",
    },
    {
      question: "Is my personal data safe with Studyflow?",
      answer: "Yes, we do not sell or share your personal information. All user data is protected and used only to improve services.",
    },
    {
      question: "Who are the founders of Studyflow?",
      answer: "Studyflow is founded by Abhay Kanojia (Founder & CEO) and supported by Riya (Content & Data Head) and Gaurav (Technical Lead/Web Developer).",
    },
  ];

  return (
    <section className="py-20 bg-background/50">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-3xl font-bold text-glow">Frequently Asked Questions</h2>
          <p className="text-muted-foreground">
            Got questions? We've got answers.
          </p>
        </div>
        
        <Accordion type="single" collapsible className="w-full">
          {faqData.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border-border/50">
              <AccordionTrigger className="text-left hover:text-primary transition-colors">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQ;