import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import '../../app/create-event-page.css';

export default function CreateEventPage() {
  return (
    <section className="create-event-page">
      <div className="page-wrapper">
        <div className="content">
          <h1>انشئ فعالية</h1>
          <form action="">
            <div className="row">
              <div className="field">
                <label htmlFor="name">الأسم</label> 
                <Input type="text" id="name" />
              </div>
            </div>
            <div className="row">
              <div className="field">
                <label htmlFor="content">المحتوي</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="المحتوي" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="programming">برمجة</SelectItem>
                    <SelectItem value="writting">كتابة</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="field">
                <label>النوع</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="النوع" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cooperative">تعاوني</SelectItem>
                    <SelectItem value="competitive">تنافسي</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="row">
              <div className="field">
                <label htmlFor="desc">الوصف</label>
                <Textarea id="desc" />
              </div>
            </div>
            <div className="row">
              <div className="field">
                <label htmlFor="date">التاريخ</label>
                <input type="date" id="date" />
              </div>
            </div>
          </form>
        </div>

        <aside>
          <p>
            اختر اسم يدل على محتوى الفعاليةهذا الاسم سيظهر للمستخدمين ويلعب دور
            في جذب انتباههم   
          </p>
          <p>
            يمكنك ترك تاريخ النهاية بدون قيمة . اي يمكنك  
            أن تنهي الفعالية متى اردت      
          </p>
        </aside>
      </div>
    </section>
  );
}

