// =========================================================
// Ася Полякова — психолог. Сайт-визитка
// Мобильное меню, аккордеон FAQ, отправка формы (демо)
// =========================================================

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Мобильное меню ---------- */
  const burger = document.getElementById('burger');
  const nav = document.getElementById('main-nav');

  if (burger && nav) {
    burger.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      burger.setAttribute('aria-expanded', String(isOpen));
      burger.classList.toggle('is-active', isOpen);
    });

    // Закрываем меню при переходе по ссылке
    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- Аккордеон FAQ ---------- */
  const triggers = document.querySelectorAll('.accordion-trigger');

  triggers.forEach(trigger => {
    const panel = trigger.nextElementSibling;
    panel.style.maxHeight = '0px';

    trigger.addEventListener('click', () => {
      const isOpen = trigger.getAttribute('aria-expanded') === 'true';

      // Закрываем все остальные пункты (классическое поведение аккордеона)
      triggers.forEach(other => {
        if (other !== trigger) {
          other.setAttribute('aria-expanded', 'false');
          other.nextElementSibling.style.maxHeight = '0px';
        }
      });

      trigger.setAttribute('aria-expanded', String(!isOpen));
      panel.style.maxHeight = isOpen ? '0px' : panel.scrollHeight + 'px';
    });
  });

  /* ---------- Форма записи (демо без бэкенда) ---------- */
  const form = document.getElementById('contact-form');
  const note = document.getElementById('form-note');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = form.name.value.trim();
      const contactMethod = form['contact-method'].value.trim();

      if (!name || !contactMethod) {
        note.textContent = 'Заполните, пожалуйста, имя и контакт для связи.';
        note.style.color = '#B2735F';
        return;
      }

      // Здесь в реальном проекте — отправка на сервер / в Telegram-бота / на email-сервис
      // (например, fetch на свой backend или сервис вроде Formspree).
      note.textContent = `Спасибо, ${name}! Заявка получена, я свяжусь с вами в течение дня.`;
      note.style.color = '#45543D';
      form.reset();
    });
  }

});