/*!
 * hakim-core.js — هسته‌ی شخصیت حکیم برای پروژه‌ی حکیمستان
 * نسخه: 1.0.0
 * ساخته مهدی شریفیان
 *
 * استفاده:
 *   <div id="hakim-container"></div>
 *   <script src="hakim-core.js"></script>
 *   <script>
 *     Hakim.init({ container: '#hakim-container', name: 'علی' });
 *     Hakim.say('سلام! خوش آمدی.');
 *   </script>
 */
(function (global) {
  'use strict';

  // ============================================================
  // 🎨 SVG چهره‌های حکیم (۹ حالت)
  // ============================================================
  const HAKIM_FACES = {
    calm: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <defs><radialGradient id="hkSkinC" cx="40%" cy="35%"><stop offset="0%" stop-color="#fce4c4"/><stop offset="100%" stop-color="#d9a878"/></radialGradient></defs>
      <path d="M20,32 Q50,12 80,32 Q80,44 74,46 L26,46 Q20,44 20,32 Z" fill="#7a4420"/><path d="M20,32 Q50,12 80,32" stroke="#a0662c" stroke-width="2.5" fill="none" stroke-linecap="round"/><circle cx="50" cy="20" r="3.5" fill="#a0662c"/><ellipse cx="50" cy="58" rx="26" ry="26" fill="url(#hkSkinC)"/><ellipse cx="24" cy="58" rx="3" ry="5" fill="#d9a878"/><ellipse cx="76" cy="58" rx="3" ry="5" fill="#d9a878"/><path d="M30,70 Q28,90 50,92 Q72,90 70,70 Q66,82 50,84 Q34,82 30,70 Z" fill="#f0f0f0" opacity=".94"/><path d="M38,58 Q42,55 46,58" stroke="#2a1a0a" stroke-width="2.5" fill="none" stroke-linecap="round"/><path d="M54,58 Q58,55 62,58" stroke="#2a1a0a" stroke-width="2.5" fill="none" stroke-linecap="round"/><path d="M36,51 Q42,49 46,51" stroke="#3a2510" stroke-width="2" fill="none" stroke-linecap="round"/><path d="M54,51 Q58,49 64,51" stroke="#3a2510" stroke-width="2" fill="none" stroke-linecap="round"/><path d="M48,62 L46,68 Q50,69 54,68 L52,62 Z" fill="#c89868"/><path d="M44,74 Q50,77 56,74" stroke="#3a2510" stroke-width="2" fill="none" stroke-linecap="round"/></svg>`,

    happy: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><defs><radialGradient id="hkSkinH" cx="40%" cy="35%"><stop offset="0%" stop-color="#fce4c4"/><stop offset="100%" stop-color="#d9a878"/></radialGradient></defs><path d="M20,32 Q50,12 80,32 Q80,44 74,46 L26,46 Q20,44 20,32 Z" fill="#7a4420"/><path d="M20,32 Q50,12 80,32" stroke="#a0662c" stroke-width="2.5" fill="none" stroke-linecap="round"/><circle cx="50" cy="20" r="3.5" fill="#a0662c"/><ellipse cx="50" cy="58" rx="26" ry="26" fill="url(#hkSkinH)"/><ellipse cx="24" cy="58" rx="3" ry="5" fill="#d9a878"/><ellipse cx="76" cy="58" rx="3" ry="5" fill="#d9a878"/><path d="M30,70 Q28,90 50,92 Q72,90 70,70 Q66,82 50,84 Q34,82 30,70 Z" fill="#f0f0f0" opacity=".94"/><path d="M37,58 Q42,52 47,58" stroke="#2a1a0a" stroke-width="2.8" fill="none" stroke-linecap="round"/><path d="M53,58 Q58,52 63,58" stroke="#2a1a0a" stroke-width="2.8" fill="none" stroke-linecap="round"/><path d="M34,48 Q42,44 47,48" stroke="#3a2510" stroke-width="2" fill="none" stroke-linecap="round"/><path d="M53,48 Q58,44 66,48" stroke="#3a2510" stroke-width="2" fill="none" stroke-linecap="round"/><path d="M48,62 L46,68 Q50,69 54,68 L52,62 Z" fill="#c89868"/><path d="M42,72 Q50,80 58,72" stroke="#3a2510" stroke-width="2.2" fill="none" stroke-linecap="round"/></svg>`,

    amazed: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><defs><radialGradient id="hkSkinA" cx="40%" cy="35%"><stop offset="0%" stop-color="#fce4c4"/><stop offset="100%" stop-color="#d9a878"/></radialGradient></defs><path d="M20,32 Q50,12 80,32 Q80,44 74,46 L26,46 Q20,44 20,32 Z" fill="#7a4420"/><path d="M20,32 Q50,12 80,32" stroke="#a0662c" stroke-width="2.5" fill="none" stroke-linecap="round"/><circle cx="50" cy="20" r="3.5" fill="#a0662c"/><ellipse cx="50" cy="58" rx="26" ry="26" fill="url(#hkSkinA)"/><ellipse cx="24" cy="58" rx="3" ry="5" fill="#d9a878"/><ellipse cx="76" cy="58" rx="3" ry="5" fill="#d9a878"/><path d="M30,70 Q28,90 50,92 Q72,90 70,70 Q66,82 50,84 Q34,82 30,70 Z" fill="#f0f0f0" opacity=".94"/><ellipse cx="41" cy="58" rx="4.5" ry="5.5" fill="#fff"/><circle cx="41" cy="58" r="2.5" fill="#2a1a0a"/><ellipse cx="59" cy="58" rx="4.5" ry="5.5" fill="#fff"/><circle cx="59" cy="58" r="2.5" fill="#2a1a0a"/><path d="M36,47 Q42,41 47,47" stroke="#3a2510" stroke-width="2.2" fill="none" stroke-linecap="round"/><path d="M53,47 Q58,41 64,47" stroke="#3a2510" stroke-width="2.2" fill="none" stroke-linecap="round"/><path d="M48,62 L46,68 Q50,69 54,68 L52,62 Z" fill="#c89868"/><ellipse cx="50" cy="76" rx="5" ry="6" fill="#3a2510"/><path d="M78,42 l2,-4 l2,4 l4,2 l-4,2 l-2,4 l-2,-4 l-4,-2 z" fill="#ffe066" opacity=".9"/></svg>`,

    thinking: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><defs><radialGradient id="hkSkinT" cx="40%" cy="35%"><stop offset="0%" stop-color="#fce4c4"/><stop offset="100%" stop-color="#d9a878"/></radialGradient></defs><path d="M20,32 Q50,12 80,32 Q80,44 74,46 L26,46 Q20,44 20,32 Z" fill="#7a4420"/><path d="M20,32 Q50,12 80,32" stroke="#a0662c" stroke-width="2.5" fill="none" stroke-linecap="round"/><circle cx="50" cy="20" r="3.5" fill="#a0662c"/><ellipse cx="50" cy="58" rx="26" ry="26" fill="url(#hkSkinT)"/><ellipse cx="24" cy="58" rx="3" ry="5" fill="#d9a878"/><ellipse cx="76" cy="58" rx="3" ry="5" fill="#d9a878"/><path d="M30,70 Q28,90 50,92 Q72,90 70,70 Q66,82 50,84 Q34,82 30,70 Z" fill="#f0f0f0" opacity=".94"/><path d="M38,59 Q42,57 46,59" stroke="#2a1a0a" stroke-width="2.3" fill="none" stroke-linecap="round"/><path d="M54,57 Q58,55 62,57" stroke="#2a1a0a" stroke-width="2.3" fill="none" stroke-linecap="round"/><path d="M36,49 Q42,45 47,49" stroke="#3a2510" stroke-width="2.2" fill="none" stroke-linecap="round"/><path d="M53,50 Q58,49 64,50" stroke="#3a2510" stroke-width="2" fill="none" stroke-linecap="round"/><path d="M48,62 L46,68 Q50,69 54,68 L52,62 Z" fill="#c89868"/><path d="M43,73 L57,73" stroke="#3a2510" stroke-width="2.2" fill="none" stroke-linecap="round"/><circle cx="82" cy="40" r="3" fill="none" stroke="#ffe066" stroke-width="1.8" opacity=".7"/><circle cx="82" cy="30" r="4" fill="none" stroke="#ffe066" stroke-width="1.8" opacity=".5"/></svg>`,

    concerned: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><defs><radialGradient id="hkSkinN" cx="40%" cy="35%"><stop offset="0%" stop-color="#fce4c4"/><stop offset="100%" stop-color="#d9a878"/></radialGradient></defs><path d="M20,32 Q50,12 80,32 Q80,44 74,46 L26,46 Q20,44 20,32 Z" fill="#7a4420"/><path d="M20,32 Q50,12 80,32" stroke="#a0662c" stroke-width="2.5" fill="none" stroke-linecap="round"/><circle cx="50" cy="20" r="3.5" fill="#a0662c"/><ellipse cx="50" cy="58" rx="26" ry="26" fill="url(#hkSkinN)"/><ellipse cx="24" cy="58" rx="3" ry="5" fill="#d9a878"/><ellipse cx="76" cy="58" rx="3" ry="5" fill="#d9a878"/><path d="M30,70 Q28,90 50,92 Q72,90 70,70 Q66,82 50,84 Q34,82 30,70 Z" fill="#f0f0f0" opacity=".94"/><ellipse cx="41" cy="58" rx="3.5" ry="4" fill="#fff"/><circle cx="41" cy="58" r="2" fill="#2a1a0a"/><ellipse cx="59" cy="58" rx="3.5" ry="4" fill="#fff"/><circle cx="59" cy="58" r="2" fill="#2a1a0a"/><path d="M35,49 Q42,51 47,53" stroke="#3a2510" stroke-width="2.2" fill="none" stroke-linecap="round"/><path d="M53,53 Q58,51 65,49" stroke="#3a2510" stroke-width="2.2" fill="none" stroke-linecap="round"/><path d="M48,62 L46,68 Q50,69 54,68 L52,62 Z" fill="#c89868"/><path d="M44,76 Q50,72 56,76" stroke="#3a2510" stroke-width="2.2" fill="none" stroke-linecap="round"/></svg>`,

    listening: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><defs><radialGradient id="hkSkinL" cx="40%" cy="35%"><stop offset="0%" stop-color="#fce4c4"/><stop offset="100%" stop-color="#d9a878"/></radialGradient></defs><path d="M20,32 Q50,12 80,32 Q80,44 74,46 L26,46 Q20,44 20,32 Z" fill="#7a4420"/><path d="M20,32 Q50,12 80,32" stroke="#a0662c" stroke-width="2.5" fill="none" stroke-linecap="round"/><circle cx="50" cy="20" r="3.5" fill="#a0662c"/><ellipse cx="50" cy="58" rx="26" ry="26" fill="url(#hkSkinL)"/><ellipse cx="24" cy="58" rx="3" ry="5" fill="#d9a878"/><ellipse cx="76" cy="58" rx="3" ry="5" fill="#d9a878"/><path d="M30,70 Q28,90 50,92 Q72,90 70,70 Q66,82 50,84 Q34,82 30,70 Z" fill="#f0f0f0" opacity=".94"/><path d="M38,59 Q42,58 46,59" stroke="#2a1a0a" stroke-width="2.3" fill="none" stroke-linecap="round"/><path d="M54,59 Q58,58 62,59" stroke="#2a1a0a" stroke-width="2.3" fill="none" stroke-linecap="round"/><path d="M36,50 Q42,48 47,50" stroke="#3a2510" stroke-width="2" fill="none" stroke-linecap="round"/><path d="M53,50 Q58,48 64,50" stroke="#3a2510" stroke-width="2" fill="none" stroke-linecap="round"/><path d="M48,62 L46,68 Q50,69 54,68 L52,62 Z" fill="#c89868"/><path d="M45,74 L55,74" stroke="#3a2510" stroke-width="2" fill="none" stroke-linecap="round"/><ellipse cx="18" cy="58" rx="4" ry="6" fill="#d9a878" opacity=".5"/></svg>`,

    celebrating: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><defs><radialGradient id="hkSkinCe" cx="40%" cy="35%"><stop offset="0%" stop-color="#fce4c4"/><stop offset="100%" stop-color="#d9a878"/></radialGradient></defs><path d="M20,32 Q50,12 80,32 Q80,44 74,46 L26,46 Q20,44 20,32 Z" fill="#7a4420"/><path d="M20,32 Q50,12 80,32" stroke="#a0662c" stroke-width="2.5" fill="none" stroke-linecap="round"/><circle cx="50" cy="20" r="3.5" fill="#a0662c"/><ellipse cx="50" cy="58" rx="26" ry="26" fill="url(#hkSkinCe)"/><ellipse cx="24" cy="58" rx="3" ry="5" fill="#d9a878"/><ellipse cx="76" cy="58" rx="3" ry="5" fill="#d9a878"/><path d="M30,70 Q28,90 50,92 Q72,90 70,70 Q66,82 50,84 Q34,82 30,70 Z" fill="#f0f0f0" opacity=".94"/><path d="M37,56 Q42,51 47,56" stroke="#2a1a0a" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M53,56 Q58,51 63,56" stroke="#2a1a0a" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M34,47 Q42,43 47,47" stroke="#3a2510" stroke-width="2" fill="none" stroke-linecap="round"/><path d="M53,47 Q58,43 66,47" stroke="#3a2510" stroke-width="2" fill="none" stroke-linecap="round"/><path d="M48,62 L46,68 Q50,69 54,68 L52,62 Z" fill="#c89868"/><path d="M39,72 Q50,84 61,72" stroke="#3a2510" stroke-width="2.5" fill="none" stroke-linecap="round"/><path d="M38,74 L38,79" stroke="#3a2510" stroke-width="1.5" fill="none"/><path d="M50,78 L50,83" stroke="#3a2510" stroke-width="1.5" fill="none"/><path d="M62,74 L62,79" stroke="#3a2510" stroke-width="1.5" fill="none"/><path d="M14,26 L18,20 L22,26 L28,24 L24,30 L28,36 L22,34 L18,40 L14,34 L8,36 L12,30 L8,24 Z" fill="#f5c842" stroke="#c9941a" stroke-width=".8" opacity=".9"/><path d="M86,26 L90,20 L94,26 L100,24 L96,30 L100,36 L94,34 L90,40 L86,34 L80,36 L84,30 L80,24 Z" fill="#f5c842" stroke="#c9941a" stroke-width=".8" opacity=".9"/><circle cx="10" cy="50" r="2" fill="#ffe066" opacity=".8"/><circle cx="92" cy="50" r="2" fill="#ffe066" opacity=".8"/></svg>`,

    curious: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><defs><radialGradient id="hkSkinCu" cx="40%" cy="35%"><stop offset="0%" stop-color="#fce4c4"/><stop offset="100%" stop-color="#d9a878"/></radialGradient></defs><g transform="rotate(-8 50 58)"><path d="M20,32 Q50,12 80,32 Q80,44 74,46 L26,46 Q20,44 20,32 Z" fill="#7a4420"/><path d="M20,32 Q50,12 80,32" stroke="#a0662c" stroke-width="2.5" fill="none" stroke-linecap="round"/><circle cx="50" cy="20" r="3.5" fill="#a0662c"/><ellipse cx="50" cy="58" rx="26" ry="26" fill="url(#hkSkinCu)"/><ellipse cx="24" cy="58" rx="3" ry="5" fill="#d9a878"/><ellipse cx="76" cy="58" rx="3" ry="5" fill="#d9a878"/><path d="M30,70 Q28,90 50,92 Q72,90 70,70 Q66,82 50,84 Q34,82 30,70 Z" fill="#f0f0f0" opacity=".94"/><ellipse cx="41" cy="58" rx="4" ry="5" fill="#fff"/><circle cx="41" cy="58" r="2.3" fill="#2a1a0a"/><ellipse cx="59" cy="58" rx="4" ry="5" fill="#fff"/><circle cx="59" cy="58" r="2.3" fill="#2a1a0a"/><path d="M36,45 Q42,41 47,45" stroke="#3a2510" stroke-width="2.2" fill="none" stroke-linecap="round"/><path d="M53,45 Q58,39 64,43" stroke="#3a2510" stroke-width="2.2" fill="none" stroke-linecap="round"/><path d="M48,62 L46,68 Q50,69 54,68 L52,62 Z" fill="#c89868"/><path d="M46,75 Q50,78 54,75" stroke="#3a2510" stroke-width="2" fill="none" stroke-linecap="round"/></g><text x="82" y="32" font-size="16" fill="#ffe066" font-weight="bold" font-family="serif">?</text></svg>`,

    proud: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><defs><radialGradient id="hkSkinP" cx="40%" cy="35%"><stop offset="0%" stop-color="#fce4c4"/><stop offset="100%" stop-color="#d9a878"/></radialGradient></defs><path d="M20,32 Q50,12 80,32 Q80,44 74,46 L26,46 Q20,44 20,32 Z" fill="#7a4420"/><path d="M20,32 Q50,12 80,32" stroke="#a0662c" stroke-width="2.5" fill="none" stroke-linecap="round"/><circle cx="50" cy="20" r="3.5" fill="#a0662c"/><ellipse cx="50" cy="58" rx="26" ry="26" fill="url(#hkSkinP)"/><ellipse cx="24" cy="58" rx="3" ry="5" fill="#d9a878"/><ellipse cx="76" cy="58" rx="3" ry="5" fill="#d9a878"/><path d="M30,70 Q28,90 50,92 Q72,90 70,70 Q66,82 50,84 Q34,82 30,70 Z" fill="#f0f0f0" opacity=".94"/><path d="M37,58 Q42,53 47,58" stroke="#2a1a0a" stroke-width="2.8" fill="none" stroke-linecap="round"/><path d="M53,58 Q58,53 63,58" stroke="#2a1a0a" stroke-width="2.8" fill="none" stroke-linecap="round"/><path d="M34,49 Q42,45 47,49" stroke="#3a2510" stroke-width="2" fill="none" stroke-linecap="round"/><path d="M53,49 Q58,45 66,49" stroke="#3a2510" stroke-width="2" fill="none" stroke-linecap="round"/><path d="M48,62 L46,68 Q50,69 54,68 L52,62 Z" fill="#c89868"/><path d="M41,73 Q50,82 59,73" stroke="#3a2510" stroke-width="2.2" fill="none" stroke-linecap="round"/><path d="M50,73 L50,78" stroke="#3a2510" stroke-width="1.5" fill="none"/><path d="M14,26 L18,20 L22,26 L28,24 L24,30 L28,36 L22,34 L18,40 L14,34 L8,36 L12,30 L8,24 Z" fill="#f5c842" stroke="#c9941a" stroke-width=".8" opacity=".85"/><path d="M86,26 L90,20 L94,26 L100,24 L96,30 L100,36 L94,34 L90,40 L86,34 L80,36 L84,30 L80,24 Z" fill="#f5c842" stroke="#c9941a" stroke-width=".8" opacity=".85"/></svg>`
  };

  // ============================================================
  // 🎭 نقشه ایموجی → حالت چهره
  // ============================================================
  const EMOJI_TO_MOOD = {
    '🧙‍♂️': 'calm', '🤩': 'amazed', '😎': 'amazed', '😊': 'happy',
    '🤔': 'thinking', '⏳': 'concerned', '💪': 'happy', '👑': 'proud',
    '🏆': 'proud', '💔': 'concerned', '📚': 'thinking', '😅': 'concerned',
    '👂': 'listening', '🎉': 'celebrating', '❓': 'curious'
  };

  // ============================================================
  // 💬 بانک پیام‌های تشویقی
  // ============================================================
  const HAKIM_PHRASES = {
    intro: [
      'سلام {name} جان! من حکیمم، همراه تو در این سفر. هر وقت لازم باشه، راهنماییت می‌کنم.',
      '{name} عزیز، خوش آمدی. من حکیمم. با هم تاریخ رو زنده می‌کنیم.'
    ],
    correctFast: [
      'آفرین {name}! در {t} ثانیه جواب دادی. خیلی سریع بودی ⚡',
      'آفرین! چه سرعتی! انگار این سوال رو از قبل می‌دونستی.',
      '{t} ثانیه؟! عالیه {name}! داری خوب پیش می‌ری 🔥'
    ],
    correctMedium: [
      'آفرین {name}. درست گفتی.',
      'کارت درسته. خوب فکر کردی.',
      'درست بود. حالا مطمئن شدم که یادت مونده.'
    ],
    correctSlow: [
      'آفرین که با دقت فکر کردی {name}. تاریخ جای عجله نداره.',
      'کمی طول کشید ولی درست بود. عجله نکن، یاد می‌گیری.',
      'درست گفتی. حالا مطمئن‌ترم که یادت مونده.'
    ],
    wrong: [
      'اشکالی نداره {name}. همه اول اشتباه می‌کنن.',
      'نگران نباش. این اشتباه خودش یه درس بود.',
      'پاسخ درست رو که خوندی، یه قدم به جلو رفتی.'
    ],
    wrongFast: [
      'عجله کردی {name}! تاریخ جای شتاب نیست.',
      'سرعت خوبه ولی نه وقتی اشتباه می‌کنی. یه نفس بکش.'
    ],
    timeout: [
      'زمان تموم شد. تاریخ عجله نداره {name}. یه نفس عمیق بکش.',
      'اشکالی نداره. دفعه بعد سریع‌تر تصمیم بگیر.'
    ],
    recovery: [
      'آفرین {name}! بعد از اشتباه، محکم برگشتی 💪',
      'همینه! حالا که جبرانش کردی، قوی‌تر ادامه بده.'
    ],
    streak3: [
      'سه تا پشت سر هم! داری گرم می‌شی {name} 🔥',
      'سه تا! عالیه! ادامه بده!'
    ],
    streak5: [
      'پنج تا پشت سر هم! {name}، داری پیشرفت می‌کنی! 👑',
      '👑 بی‌نظیر! پنج پاسخ درست پشت سر هم! عالیه!'
    ],
    weakLesson: {
      18: 'می‌بینم که درس ۱۸ کمی اذیتت می‌کنه. قیام سیاه‌جامگان و حکومت‌های ایرانی مثل سامانیان. حواست به خواجه‌ها و شاعرانشون باشه.',
      19: 'درس ۱۹ رو کم‌کم از دست می‌دی {name}. سلجوقیان، وزیران کاردان مثل خواجه نظام‌الملک. مدرسه‌های نظامیه رو یادت هست؟',
      20: 'درس ۲۰ تلخه، می‌دونم. حمله مغول و تیمور. حواست به تفاوت چنگیز و هلاکو باشه.',
      21: 'درس ۲۱ امیدوارکننده‌ست {name}: بازسازی. خواجه نصیر و رشیدالدین اینجا نقش دارن.'
    },
    cityConquered: [
      '🏆 {city} فتح شد! یه قدم دیگه به وحدت ایران نزدیک شدیم.',
      '{city} از آنِ ما شد {name}! افتخار کن.'
    ],
    perfectCity: [
      '{city} رو بی‌نقص فتح کردی! حتی بدون یک اشتباه 🤩',
      '👑 {city} بدون خطا! این یعنی تسلط واقعی.'
    ],
    lowHearts: [
      '{name} جان، فقط {h} قلب داری. محتاط باش.',
      'مراقب باش! آخرین فرصت‌هاست.'
    ]
  };

  // ============================================================
  // 🔧 کمکی‌ها
  // ============================================================
  function fillTemplate(str, vars) {
    return String(str).replace(/\{(\w+)\}/g, (_, k) => (vars && vars[k] != null) ? vars[k] : '');
  }
  function pickPhrase(arr) {
    if (!Array.isArray(arr) || arr.length === 0) return '';
    return arr[Math.floor(Math.random() * arr.length)];
  }
  function toEnglishNum(s) {
    const map = {'۰':'0','۱':'1','۲':'2','۳':'3','۴':'4','۵':'5','۶':'6','۷':'7','۸':'8','۹':'9'};
    return String(s).replace(/[۰-۹]/g, d => map[d]);
  }
  function getLessonFromQ(q) {
    const m = String((q && q.explanation) || '').match(/درس\s*([۰-۹]+)/);
    if (!m) return null;
    return parseInt(toEnglishNum(m[1]), 10) || null;
  }

  // ============================================================
  // 🎨 تزریق CSS (یک‌بار)
  // ============================================================
  let stylesInjected = false;
  function injectStyles() {
    if (stylesInjected) return;
    const style = document.createElement('style');
    style.id = 'hakim-core-styles';
    style.textContent = `
      .hakim-panel{max-width:750px;margin:0 auto 16px;padding:12px 14px;background:linear-gradient(145deg,rgba(50,32,12,.85),rgba(28,18,6,.85));border:1.5px solid rgba(245,200,66,.28);border-radius:18px;display:none;align-items:flex-start;gap:12px;position:relative;overflow:hidden;backdrop-filter:blur(8px);box-shadow:0 6px 25px rgba(0,0,0,.5),inset 0 1px 0 rgba(255,255,255,.05);transition:box-shadow .4s ease}
      .hakim-panel.active{display:flex}
      .hakim-panel.speaking{box-shadow:0 6px 35px rgba(245,200,66,.25),inset 0 1px 0 rgba(255,255,255,.08)}
      .hakim-panel::before{content:'';position:absolute;top:0;right:-50px;width:250px;height:100%;background:radial-gradient(ellipse at right,rgba(245,200,66,.10),transparent 65%);pointer-events:none}
      .hakim-avatar{position:relative;width:76px;height:76px;border-radius:50%;background:radial-gradient(circle at 30% 30%,#f5c842 0%,#b87a18 50%,#6b4008 100%);display:flex;align-items:center;justify-content:center;flex-shrink:0;border:2px solid rgba(255,245,200,.4);box-shadow:0 0 18px rgba(245,200,66,.45),inset 0 -3px 8px rgba(0,0,0,.4);transition:transform .3s}
      .hakim-panel.speaking .hakim-avatar{animation:hakimSpeak .7s cubic-bezier(.175,.885,.32,1.275)}
      @keyframes hakimSpeak{0%,100%{transform:scale(1) rotate(0)}30%{transform:scale(1.15) rotate(-8deg)}70%{transform:scale(1.1) rotate(6deg)}}
      .hakim-glow{position:absolute;inset:-6px;border-radius:50%;background:radial-gradient(circle,rgba(245,200,66,.5),transparent 70%);animation:hakimGlow 6s ease-in-out infinite;pointer-events:none;z-index:-1}
      @keyframes hakimGlow{0%,100%{opacity:.35;transform:scale(1)}50%{opacity:.85;transform:scale(1.18)}}
      .hakim-face{position:absolute;inset:3px;border-radius:50%;overflow:hidden;z-index:1;display:flex;align-items:center;justify-content:center;background:radial-gradient(circle at 40% 35%,#2a1a0a 0%,#0a0502 100%);box-shadow:inset 0 0 8px rgba(0,0,0,.6)}
      .hakim-face svg{width:100%;height:100%;display:block}
      .hakim-face.face-change{animation:hakimFaceChange .55s cubic-bezier(.34,1.56,.64,1)}
      @keyframes hakimFaceChange{0%{transform:scale(1) rotate(0)}35%{transform:scale(.82) rotate(-8deg)}70%{transform:scale(1.05) rotate(3deg)}100%{transform:scale(1) rotate(0)}}
      .hakim-bubble{flex:1;min-width:0;padding-top:8px}
      .hakim-name{font-size:.68rem;color:#f5c842;font-weight:800;margin-bottom:4px;letter-spacing:.6px;display:flex;align-items:center;gap:5px}
      .hakim-name .hakim-dot{width:7px;height:7px;border-radius:50%;background:#2ecc71;box-shadow:0 0 8px #2ecc71;animation:hakimDot 1.8s infinite}
      @keyframes hakimDot{0%,100%{opacity:1}50%{opacity:.4}}
      .hakim-text{font-size:.92rem;color:#f5edd6;line-height:1.8;text-align:right;min-height:1.5em;font-weight:500}
      .hakim-text.typing::after{content:'▍';animation:hakimCursor .7s infinite;color:#f5c842;margin-right:2px}
      @keyframes hakimCursor{50%{opacity:0}}
      .hakim-sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}
      body[data-theme="dark"] .hakim-panel{background:linear-gradient(145deg,rgba(15,28,50,.85),rgba(5,12,24,.85));border-color:rgba(160,200,255,.25)}
      body[data-theme="dawn"] .hakim-panel{background:linear-gradient(145deg,rgba(55,21,61,.85),rgba(28,6,32,.85));border-color:rgba(255,157,108,.28)}
      body[data-theme="flag"] .hakim-panel{background:linear-gradient(145deg,rgba(13,38,24,.85),rgba(5,18,10,.85));border-color:rgba(46,204,113,.3)}
      /* کارنامه حکیم */
      .hakim-report-line{font-size:.85rem;color:#f5edd6;line-height:1.9;padding:12px 14px;background:rgba(245,200,66,.06);border-radius:12px;border-right:3px solid #c9941a;margin-bottom:12px;text-align:right;font-weight:600}
      .hakim-lesson-grid{display:flex;flex-direction:column;gap:10px;margin-bottom:14px}
      .hakim-lesson-item{padding:10px 12px;background:rgba(0,0,0,.25);border:1px solid rgba(245,200,66,.15);border-radius:12px}
      .hl-name{font-size:.75rem;font-weight:800;color:#fff3b0;margin-bottom:6px;text-align:right}
      .hl-bar{height:8px;background:rgba(255,255,255,.05);border-radius:20px;overflow:hidden;margin-bottom:5px}
      .hl-fill{height:100%;border-radius:20px;transition:width .6s cubic-bezier(.4,0,.2,1);box-shadow:0 0 8px currentColor}
      .hl-stat{font-size:.68rem;font-weight:700;text-align:right}
      .hakim-report-sign{text-align:center;font-size:.7rem;color:#f5c842;font-weight:700;letter-spacing:1px;margin-top:16px;padding-top:12px;border-top:1px dashed rgba(245,200,66,.25)}
    `;
    document.head.appendChild(style);
    stylesInjected = true;
  }

  // ============================================================
  // 🧠 پروفایل (state داخلی برای ردگیری)
  // ============================================================
  function createProfile() {
    return {
      lesson: { 18: {c:0,w:0}, 19: {c:0,w:0}, 20: {c:0,w:0}, 21: {c:0,w:0} },
      consecutiveCorrect: 0,
      consecutiveWrong: 0,
      maxConsecutiveCorrect: 0,
      maxConsecutiveWrong: 0,
      recovered: 0,
      lastWasWrong: false,
      fastWins: 0,
      slowCorrects: 0,
      weakLessonWarned: {},
      _shownRecovery: false
    };
  }

  // ============================================================
  // 🧙‍♂️ state اصلی
  // ============================================================
  const state = {
    container: null,
    panelEl: null,
    faceEl: null,
    textEl: null,
    srEl: null,
    typeTimer: null,
    hideTimer: null,
    name: 'دوست من',
    mood: 'calm',
    profile: null,
    onWeakLesson: null,
    initialized: false
  };

  function ensureProfile() {
    if (!state.profile) state.profile = createProfile();
  }

  // ============================================================
  // 🏗️ ساخت پنل
  // ============================================================
  function buildPanel(container) {
    container.innerHTML = `
      <div class="hakim-panel" id="hakimPanel">
        <div class="hakim-avatar">
          <div class="hakim-glow" aria-hidden="true"></div>
          <div class="hakim-face" id="hakimFace"></div>
        </div>
        <div class="hakim-bubble">
          <div class="hakim-name"><span class="hakim-dot" aria-hidden="true"></span> حکیم، همراه تو</div>
          <div class="hakim-text" id="hakimText" aria-hidden="true"></div>
          <div class="hakim-sr-only" id="hakimSrText" role="status" aria-live="polite"></div>
        </div>
      </div>
    `;
    state.panelEl = container.querySelector('.hakim-panel');
    state.faceEl = container.querySelector('.hakim-face');
    state.textEl = container.querySelector('.hakim-text');
    state.srEl = container.querySelector('#hakimSrText');
    setMood('calm');
  }

  // ============================================================
  // 🎨 API عمومی
  // ============================================================
  function init(options) {
    options = options || {};
    injectStyles();

    if (options.name) state.name = String(options.name);
    if (typeof options.onWeakLesson === 'function') state.onWeakLesson = options.onWeakLesson;

    const container = typeof options.container === 'string'
      ? document.querySelector(options.container)
      : options.container;

    if (!container) {
      console.warn('[Hakim] container not found:', options.container);
      return api;
    }

    state.container = container;
    buildPanel(container);
    ensureProfile();
    state.initialized = true;
    return api;
  }

  function setMood(mood) {
    if (!state.faceEl) return;
    const m = HAKIM_FACES[mood] ? mood : 'calm';
    if (state.faceEl.dataset.mood === m) return;
    state.mood = m;
    state.faceEl.dataset.mood = m;
    state.faceEl.innerHTML = HAKIM_FACES[m];
    state.faceEl.classList.remove('face-change');
    void state.faceEl.offsetWidth;
    state.faceEl.classList.add('face-change');
  }

  function renderFace(mood, element) {
    if (!element) return;
    const m = HAKIM_FACES[mood] ? mood : 'calm';
    element.innerHTML = HAKIM_FACES[m];
    element.classList.remove('face-change');
    void element.offsetWidth;
    element.classList.add('face-change');
  }

  function say(text, opts) {
    opts = opts || {};
    if (!state.panelEl || !state.textEl) {
      console.warn('[Hakim] not initialized. Call Hakim.init() first.');
      return;
    }
    const msg = String(text || '');
    if (!msg) return;

    let mood = opts.mood;
    if (!mood && opts.emoji) mood = EMOJI_TO_MOOD[opts.emoji] || 'calm';
    if (mood) setMood(mood);

    state.panelEl.classList.add('active');
    state.panelEl.classList.add('speaking');
    state.textEl.textContent = '';
    state.textEl.classList.add('typing');
    if (state.srEl) state.srEl.textContent = '';

    clearInterval(state.typeTimer);
    clearTimeout(state.hideTimer);

    const speed = opts.speed || 22;
    let i = 0;
    state.typeTimer = setInterval(() => {
      state.textEl.textContent += msg.charAt(i);
      i++;
      if (i >= msg.length) {
        clearInterval(state.typeTimer);
        state.textEl.classList.remove('typing');
        if (state.srEl) state.srEl.textContent = msg;
      }
    }, speed);

    setTimeout(() => state.panelEl.classList.remove('speaking'), 700);

    const autoHide = opts.autoHide !== false && !opts.permanent;
    if (autoHide) {
      const total = msg.length * speed + 4200;
      state.hideTimer = setTimeout(() => {
        state.panelEl.classList.remove('active');
        setMood('calm');
      }, total);
    }
  }

  function sayRandom(category, vars, opts) {
    const arr = HAKIM_PHRASES[category];
    if (!arr) {
      console.warn('[Hakim] unknown phrase category:', category);
      return;
    }
    const phrase = pickPhrase(arr);
    const msg = fillTemplate(phrase, vars || { name: state.name });
    say(msg, opts);
  }

  function show() { if (state.panelEl) state.panelEl.classList.add('active'); }
  function hide() { if (state.panelEl) state.panelEl.classList.remove('active'); }
  function reset() {
    clearInterval(state.typeTimer);
    clearTimeout(state.hideTimer);
    if (state.textEl) state.textEl.textContent = '';
    if (state.srEl) state.srEl.textContent = '';
    if (state.panelEl) state.panelEl.classList.remove('active', 'speaking');
    setMood('calm');
    state.profile = createProfile();
  }

  function setName(name) { state.name = String(name || 'دوست من'); }
  function getName() { return state.name; }

  // ============================================================
  // 📊 ردگیری و واکنش
  // ============================================================
  function track(correct, timeUsed, lesson) {
    ensureProfile();
    const p = state.profile;
    if (lesson && p.lesson[lesson]) {
      if (correct) p.lesson[lesson].c++;
      else p.lesson[lesson].w++;
    }
    if (correct) {
      p.consecutiveCorrect++;
      p.consecutiveWrong = 0;
      if (p.consecutiveCorrect > p.maxConsecutiveCorrect) p.maxConsecutiveCorrect = p.consecutiveCorrect;
      if (p.lastWasWrong) { p.recovered++; p.lastWasWrong = false; }
      if (timeUsed <= 5) p.fastWins++;
      if (timeUsed >= 10) p.slowCorrects++;
    } else {
      p.consecutiveWrong++;
      p.consecutiveCorrect = 0;
      if (p.consecutiveWrong > p.maxConsecutiveWrong) p.maxConsecutiveWrong = p.consecutiveWrong;
      p.lastWasWrong = true;

      if (lesson && p.lesson[lesson] && p.lesson[lesson].w >= 2) {
        if (typeof state.onWeakLesson === 'function') {
          state.onWeakLesson(lesson);
        }
      }
    }
  }

  function react(correct, timeUsed, lesson, wasTimeout) {
    ensureProfile();
    const p = state.profile;
    const name = state.name;

    if (correct) {
      if (p.consecutiveCorrect === 3) {
        sayRandom('streak3', { name }, { emoji: '🤩' });
      } else if (p.consecutiveCorrect === 5) {
        sayRandom('streak5', { name }, { emoji: '👑' });
      } else if (p.recovered > 0 && p.recovered <= 2 && !p._shownRecovery) {
        sayRandom('recovery', { name }, { emoji: '💪' });
        p._shownRecovery = true;
      } else if (timeUsed <= 5) {
        sayRandom('correctFast', { name, t: toEnglishNum(timeUsed) }, { emoji: '😎' });
      } else if (timeUsed >= 10) {
        sayRandom('correctSlow', { name }, { emoji: '🤔' });
      } else {
        sayRandom('correctMedium', { name }, { emoji: '😊' });
      }
    } else {
      if (wasTimeout) {
        sayRandom('timeout', { name }, { emoji: '⏳' });
      } else if (timeUsed <= 4) {
        sayRandom('wrongFast', { name }, { emoji: '😅' });
      } else {
        sayRandom('wrong', { name }, { emoji: '🤔' });
      }

      if (lesson && p.lesson[lesson] && p.lesson[lesson].w >= 2 && !p.weakLessonWarned[lesson]) {
        p.weakLessonWarned[lesson] = true;
        const hint = HAKIM_PHRASES.weakLesson[lesson];
        if (hint) {
          setTimeout(() => {
            say(fillTemplate(hint, { name }), { emoji: '📚' });
          }, 3200);
        }
      }
    }
  }

  function onCityConquered(cityName, isPerfect) {
    const name = state.name;
    if (isPerfect) {
      sayRandom('perfectCity', { city: cityName, name }, { emoji: '👑' });
    } else {
      sayRandom('cityConquered', { city: cityName, name }, { emoji: '🏆' });
    }
  }

  function onLowHearts(hearts) {
    sayRandom('lowHearts', { name: state.name, h: toEnglishNum(hearts) }, { emoji: '💔' });
  }

  function getProfile() { ensureProfile(); return state.profile; }

  // ============================================================
  // 📜 کارنامه‌ی حکیم
  // ============================================================
  function buildReport(options) {
    options = options || {};
    ensureProfile();
    const p = state.profile;
    const name = state.name;
    const lessonNames = {
      18: 'قیام و حکومت‌های ایرانی',
      19: 'سلجوقیان و وزیران کاردان',
      20: 'حمله مغول و تیمور',
      21: 'بازسازی ایران'
    };
    let html = '';

    const totalWrong = [18,19,20,21].reduce((a, l) => a + p.lesson[l].w, 0);
    let personality;
    if (p.fastWins >= 4 && totalWrong <= 3) {
      personality = `${name} جان، تو یه تاریخ‌دان سریع و دقیقی. مسلطی و بی‌درنگ جواب می‌دی. این ترکیب کمیابه.`;
    } else if (p.slowCorrects >= 3) {
      personality = `${name} جان، تو با دقت فکر می‌کنی. هیچ‌وقت بی‌گدار به آب نمی‌زنی و این ویژگی ارزشمندیه.`;
    } else if (p.recovered >= 3) {
      personality = `${name} جان، شکست‌ها تو رو متوقف نمی‌کنن. هر بار بعد از اشتباه قوی‌تر برمی‌گردی. این روح یه سردار واقعیه.`;
    } else if (p.maxConsecutiveCorrect >= 5) {
      personality = `${name} جان، وقتی شروع می‌کنی، پشت سر هم درست جواب می‌دی. این نشانه‌ی تسلط توئه.`;
    } else {
      personality = `${name} جان، تو یه تاریخ‌آموز کنجکاوی. راه رو تازه شروع کردی و این شروع قشنگیه.`;
    }
    html += `<div class="hakim-report-line">${personality}</div>`;

    if (options.commander) {
      const cmd = options.commander;
      html += `<div class="hakim-report-line" style="background:rgba(155,89,182,0.08);border-right-color:#9b59b6;">
        ${cmd.icon || ''} <strong>سردارت:</strong> ${cmd.name} (${cmd.title || ''}) — ${cmd.desc || ''}
      </div>`;
    }

    html += '<div class="hakim-lesson-grid">';
    const lessonStats = [];
    for (const lesson of [18, 19, 20, 21]) {
      const l = p.lesson[lesson];
      const total = l.c + l.w;
      if (total === 0) continue;
      const pct = Math.round((l.c / total) * 100);
      let grade, color;
      if (pct >= 80) { grade = 'عالی'; color = '#2ecc71'; }
      else if (pct >= 60) { grade = 'خوب'; color = '#3498db'; }
      else if (pct >= 40) { grade = 'قابل قبول'; color = '#e67e22'; }
      else { grade = 'نیاز به مرور'; color = '#e74c3c'; }
      lessonStats.push({ lesson, pct, c: l.c, w: l.w });
      html += `<div class="hakim-lesson-item">
        <div class="hl-name">درس ${toEnglishNum(lesson)}: ${lessonNames[lesson]}</div>
        <div class="hl-bar"><div class="hl-fill" style="width:${pct}%;background:${color}"></div></div>
        <div class="hl-stat" style="color:${color}">${grade} — ${toEnglishNum(l.c)} از ${toEnglishNum(total)}</div>
      </div>`;
    }
    html += '</div>';

    const weakest = lessonStats.slice().sort((a, b) => a.pct - b.pct)[0];
    if (weakest && weakest.pct < 60) {
      html += `<div class="hakim-report-line" style="background:rgba(245,200,66,0.10);border-right-color:#f5c842;">
        📌 پیشنهاد من: یه بار دیگه درس ${toEnglishNum(weakest.lesson)} رو مرور کن.
      </div>`;
    } else if (lessonStats.length > 0) {
      html += `<div class="hakim-report-line" style="background:rgba(46,204,113,0.10);border-right-color:#2ecc71;">
        🌟 همه‌ی درس‌ها رو خوب بلدی ${name}. دفعه‌ی بعد یه بار دیگه بازی کن و ببین می‌تونی سریع‌تر جواب بدی.
      </div>`;
    }

    html += `<div class="hakim-report-sign">✦ حکیم، همراه تو در این سفر</div>`;
    return html;
  }

  // ============================================================
  // 🌟 میان‌بُرها (mood shortcuts)
  // ============================================================
  const moodShortcuts = {};
  ['calm','happy','amazed','thinking','concerned','listening','celebrating','curious','proud'].forEach(m => {
    moodShortcuts[m] = () => setMood(m);
  });

  // ============================================================
  // 🎁 API نهایی
  // ============================================================
  const api = Object.assign({
    // Init
    init,
    // Faces & moods
    setMood,
    renderFace,
    // Speaking
    say,
    sayRandom,
    // Show/hide
    show, hide, reset,
    // Name
    setName, getName,
    // Profile
    track,
    react,
    onCityConquered,
    onLowHearts,
    getProfile,
    buildReport,
    // Constants
    FACES: HAKIM_FACES,
    PHRASES: HAKIM_PHRASES,
    VERSION: '1.0.0'
  }, moodShortcuts);

  global.Hakim = api;

})(typeof window !== 'undefined' ? window : this);
