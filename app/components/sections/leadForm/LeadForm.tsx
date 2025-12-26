import LeadFormCard from "./LeadFormCard";
import s from "./leadform.module.css";

const LeadForm = () => {
  return (
    <section className={s.leadFormCont} id="lead-form">

      <div className={s.inner}>
      <div className={s.img} />
        <LeadFormCard />
      </div>
    </section>
  );
};

export default LeadForm;
