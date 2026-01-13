"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle, Mail, Phone, MapPin } from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";

export default function ContactPage() {
  const [formState, setFormState] = useState<"idle" | "submitting" | "success">("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("submitting");

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setFormState("success");
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const inputClassName = `
    w-full bg-white border border-slate-200 rounded-lg px-4 py-4
    text-slate-900 placeholder-slate-400
    focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600
    transition-all duration-300
  `;

  return (
    <div className="relative overflow-hidden pt-32 min-h-screen bg-white">
      {/* Header */}
      <section className="relative px-6 lg:px-8 pb-16">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <span className="inline-block text-blue-600 text-sm font-semibold tracking-widest uppercase mb-6">
              יצירת קשר
            </span>
          </FadeIn>
          <FadeIn delay={0.2}>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-slate-900 mb-6">
              הגשת בקשה לניהול
            </h1>
          </FadeIn>
          <FadeIn delay={0.4}>
            <p className="text-slate-600 text-lg md:text-xl max-w-2xl leading-relaxed">
              ספרו לנו על הפרויקט שלכם ונחזור אליכם תוך 24 שעות.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Form Section */}
      <section className="relative px-6 lg:px-8 pb-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-16">
            {/* Form */}
            <div className="lg:col-span-3">
              <FadeIn delay={0.3}>
                <AnimatePresence mode="wait">
                  {formState === "success" ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="bg-slate-50 border border-slate-100 rounded-xl p-12 text-center"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring" }}
                        className="w-20 h-20 mx-auto mb-6 rounded-full bg-blue-50 flex items-center justify-center"
                      >
                        <CheckCircle className="w-10 h-10 text-blue-600" />
                      </motion.div>
                      <h3 className="text-2xl font-bold text-slate-900 mb-4">
                        הבקשה נשלחה בהצלחה
                      </h3>
                      <p className="text-slate-600 mb-8">
                        קיבלנו את הפרטים שלכם ונחזור אליכם בהקדם.
                      </p>
                      <button
                        onClick={() => {
                          setFormState("idle");
                          setFormData({
                            name: "",
                            email: "",
                            phone: "",
                            projectType: "",
                            message: "",
                          });
                        }}
                        className="text-blue-600 hover:text-blue-700 transition-colors font-medium"
                      >
                        שלח בקשה נוספת
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      onSubmit={handleSubmit}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-6"
                    >
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label
                            htmlFor="name"
                            className="block text-slate-700 text-sm font-medium mb-2"
                          >
                            שם מלא
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            className={inputClassName}
                            placeholder="השם שלכם"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="email"
                            className="block text-slate-700 text-sm font-medium mb-2"
                          >
                            אימייל
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className={inputClassName}
                            placeholder="email@example.com"
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label
                            htmlFor="phone"
                            className="block text-slate-700 text-sm font-medium mb-2"
                          >
                            טלפון
                          </label>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className={inputClassName}
                            placeholder="050-0000000"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="projectType"
                            className="block text-slate-700 text-sm font-medium mb-2"
                          >
                            סוג הפרויקט
                          </label>
                          <select
                            id="projectType"
                            name="projectType"
                            value={formData.projectType}
                            onChange={handleChange}
                            className={inputClassName}
                          >
                            <option value="">בחרו סוג</option>
                            <option value="residential">מגורים</option>
                            <option value="commercial">מסחרי</option>
                            <option value="mixed">מעורב</option>
                            <option value="other">אחר</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="message"
                          className="block text-slate-700 text-sm font-medium mb-2"
                        >
                          ספרו לנו על הפרויקט
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          rows={6}
                          value={formData.message}
                          onChange={handleChange}
                          className={inputClassName}
                          placeholder="מה אתם בונים? מה הכי מציק לכם היום?"
                        />
                      </div>

                      <motion.button
                        type="submit"
                        disabled={formState === "submitting"}
                        className={`
                          w-full md:w-auto px-8 py-4 bg-blue-600 text-white font-medium
                          rounded-lg flex items-center justify-center gap-3
                          hover:bg-blue-700 transition-colors duration-300 shadow-sm
                          disabled:opacity-50 disabled:cursor-not-allowed
                        `}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {formState === "submitting" ? (
                          <>
                            <motion.div
                              className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            />
                            שולח...
                          </>
                        ) : (
                          <>
                            שלח בקשה
                            <Send className="w-4 h-4" />
                          </>
                        )}
                      </motion.button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </FadeIn>
            </div>

            {/* Contact Info */}
            <div className="lg:col-span-2">
              <FadeIn delay={0.5}>
                <div className="bg-slate-50 border border-slate-100 rounded-xl p-8 lg:p-10 sticky top-32">
                  <h3 className="text-xl font-bold text-slate-900 mb-8">
                    דרכים נוספות ליצור קשר
                  </h3>

                  <div className="space-y-6">
                    <a
                      href="mailto:hello@ctrl.co.il"
                      className="flex items-start gap-4 group"
                    >
                      <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                        <Mail className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-slate-500 text-sm mb-1">אימייל</p>
                        <p className="text-slate-900 group-hover:text-blue-600 transition-colors">
                          hello@ctrl.co.il
                        </p>
                      </div>
                    </a>

                    <a href="tel:+972500000000" className="flex items-start gap-4 group">
                      <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                        <Phone className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-slate-500 text-sm mb-1">טלפון</p>
                        <p className="text-slate-900 group-hover:text-blue-600 transition-colors">
                          050-000-0000
                        </p>
                      </div>
                    </a>

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-slate-500 text-sm mb-1">מיקום</p>
                        <p className="text-slate-900">תל אביב, ישראל</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-10 pt-8 border-t border-slate-200">
                    <p className="text-slate-500 text-sm leading-relaxed">
                      מעדיפים לדבר? צרו קשר טלפוני ונקבע שיחת היכרות.
                      אנחנו זמינים בימים א׳-ה׳, 9:00-18:00.
                    </p>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
