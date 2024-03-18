import '../../app/guide.css';
import  { Book } from "phosphor-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import guides from '../assets/guide.json';

export default function GuidePage() {
  return (
    <section className="guide-page">
      <div className="page-wrapper">
        <div className="content">
          <h2 className="guide-heading">الدليل</h2>
          <div className="faqs-wrapper">
            <AccordionDemo />
          </div>
        </div>

        <aside className="guide-sidebar">
          <h3 className="header">دليلك لإستخدام المنصة</h3>
          <div className="body">
            <input placeholder="ابحث عن" name="search-query" />
            <span className="icon">
              <Book />
            </span>
          </div>
        </aside>
      </div>
    </section>
  );
}

function AccordionDemo() {
  return (
    <Accordion type="single" collapsible className="w-full">
      {
        guides.map((obj, i) => {
          return (
            <AccordionItem value={`item-${i + 1}`} key={i}>
              <AccordionTrigger>{obj.title}</AccordionTrigger>
              <AccordionContent>
                {obj.content}
              </AccordionContent>
            </AccordionItem>
          );
        })
      }
    </Accordion>
  );
}