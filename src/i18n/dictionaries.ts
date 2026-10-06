export type Language = 'tr' | 'en';

export const dictionaries = {
  tr: {
    // Navigation
    'nav.services': 'HİZMETLER',
    'nav.schedule': 'PROGRAM',
    'nav.about': 'HAKKIMIZDA',
    'nav.trainers': 'EĞİTMENLER',
    'nav.book': 'DERS PLANLA',

    // Hero
    'hero.subtitle': 'Pilates · Fitness · Personal Training',
    'hero.title': 'FARKLI<br />HAREKET ET.',
    'hero.desc': 'Bedeni güçlendiren, hareketi dönüştüren ve kendine ayırdığın zamanı değerli kılan bir deneyim.',
    'hero.cta.primary': 'İLK DERSİNİ PLANLA',
    'hero.cta.secondary': 'STÜDYOYU KEŞFET',

    // MovementTypes
    'move.title': 'SENİN HAREKETİN HANGİSİ?',
    'move.pilates.title': 'PILATES',
    'move.pilates.desc': 'Denge, esneklik ve core gücü odaklı akıcı hareketler.',
    'move.fitness.title': 'FITNESS',
    'move.fitness.desc': 'Güç, kondisyon ve dayanıklılık için özel antrenmanlar.',
    'move.reformer.title': 'REFORMER',
    'move.reformer.desc': 'Direnç ve kontrolü birleştiren dinamik pilates.',
    'move.discover': 'KEŞFET',

    // GoalSelector
    'goal.title': 'HEDEFİNİ SEÇ',
    'goal.flexibility': 'ESNEKLİK',
    'goal.strength': 'GÜÇ',
    'goal.posture': 'POSTÜR',
    'goal.flex.title': 'Daha Esnek Bir Beden',
    'goal.flex.desc': 'Mat pilates ve özel reformer seanslarıyla eklem mobilitenizi artırın, kas boyunuzu uzatın ve gündelik hayattaki hareket alanınızı genişletin.',
    'goal.str.title': 'Daha Güçlü Bir Sen',
    'goal.str.desc': 'Kişiye özel fitness programları ve ağırlık çalışmalarıyla kas kütlenizi artırın, fiziksel kapasitenizi maksimuma çıkarın.',
    'goal.post.title': 'Mükemmel Duruş',
    'goal.post.desc': 'Omurga sağlığını merkeze alan klinik pilates yaklaşımıyla masa başı ağrılarından kurtulun ve dik bir duruşa sahip olun.',

    // SchedulePreview
    'schedule.title': 'BUGÜN STÜDYODA',
    'schedule.capacity': 'Kapasite: 8 Kişi',
    'schedule.capacity5': 'Kapasite: 5 Kişi',
    'schedule.free': 'Serbest Alan',
    'schedule.pt': 'Birebir',
    'schedule.cta': 'DERSİ GÖR',

    // BrandStory
    'story.title': 'HAREKET,<br />EGZERSİZDEN<br />DAHA FAZLASIDIR.',
    'story.p1': 'Nalan Sarı Pilates & Fitness olarak, sadece ter döktüğünüz bir salon değil, bedeninizi ve zihninizi yenilediğiniz bir yaşam alanı sunuyoruz.',
    'story.p2': 'Her bireyin anatomisi, hedefi ve hikayesi farklıdır. Bu yüzden standart programlar yerine, tamamen size özel tasarlanmış, bilimsel temellere dayanan bir deneyim vadediyoruz. Bizimle geçirdiğiniz her dakika, kendinize yaptığınız en değerli yatırımdır.',

    // Journey
    'journey.title': 'YOLCULUĞUN',
    'journey.step1.title': '01 TANIŞMA',
    'journey.step1.desc': 'Hedeflerini, sağlık geçmişini ve beklentilerini dinliyor, sana en uygun yol haritasını çıkarıyoruz.',
    'journey.step2.title': '02 ANALİZ',
    'journey.step2.desc': 'Postür ve vücut kompozisyonu analizi ile bedeninin ihtiyaçlarını bilimsel olarak belirliyoruz.',
    'journey.step3.title': '03 HAREKET',
    'journey.step3.desc': 'Sana özel hazırlanmış programla stüdyoda ter dökmeye ve sınırlarını keşfetmeye başlıyorsun.',
    'journey.step4.title': '04 DÖNÜŞÜM',
    'journey.step4.desc': 'Fiziksel ve zihinsel değişimi hissediyor, daha güçlü ve dengeli bir versiyonuna ulaşıyorsun.',

    // StudioExperience
    'studio.title': 'STÜDYOMUZU KEŞFET',
    'studio.pilates': 'Pilates Alanı',
    'studio.pilates.desc': 'Reformer ve Cadillac ekipmanları.',
    'studio.fitness': 'Fitness Alanı',
    'studio.fitness.desc': 'Serbest ağırlıklar ve kardiyo alanı.',
    'studio.pt': 'Birebir Eğitim',
    'studio.pt.desc': 'Birebir çalışma için özel stüdyo.',

    // Services
    'services.pilates.desc': 'Mat üzerinde kendi vücut ağırlığınızla yapılan, core bölgesini hedef alan temel pilates pratiği.',
    'services.pilates.who': 'Postürünü düzeltmek ve core bölgesini güçlendirmek isteyen herkes.',
    'services.pilates.benefits': 'Gelişmiş Postür, Core Gücü, Esneklik',
    
    'services.fitness.desc': 'Modern ekipmanlar ve serbest ağırlıklarla hedefe yönelik kuvvet ve kondisyon çalışmaları.',
    'services.fitness.who': 'Kas kütlesini artırmak, yağ yakmak ve genel kondisyonunu geliştirmek isteyenler.',
    'services.fitness.benefits': 'Kas Gücü, Kardiyovasküler Sağlık, Dayanıklılık',

    'services.reformer.desc': 'Özel Reformer ekipmanı kullanılarak yay dirençleriyle uygulanan dinamik pilates egzersizleri.',
    'services.reformer.who': 'Düşük etkili ancak yüksek yoğunluklu tüm vücut antrenmanı arayanlar.',
    'services.reformer.benefits': 'Dengeli Kas Gelişimi, Eklem Mobilitesi, Sıkılaşma',

    'services.metavacu.desc': 'Vakum ve kızılötesi teknolojisini birleştiren yenilikçi cihazımızla bölgesel incelme ve selülit tedavisi.',
    'services.metavacu.who': 'Hızlı yağ yakımı, sıkılaşma ve ödem atmak isteyenler.',
    'services.metavacu.benefits': 'Bölgesel İncelme, Selülit Giderme, Toksin Atımı',

    'services.hamile.desc': 'Hamilelik sürecine özel, güvenli ve doğuma hazırlayıcı kontrollü pilates egzersizleri.',
    'services.hamile.who': 'Sağlıklı ve rahat bir hamilelik geçirmek isteyen anne adayları.',
    'services.hamile.benefits': 'Ağrı Kontrolü, Doğuma Hazırlık, Rahatlama',

    'services.label.who': 'Kimler İçin:',
    'services.label.benefits': 'Faydaları:',
    'services.cta': 'DETAYLARI GÖR',

    // Trainers
    'trainers.title': 'EĞİTMENLERİMİZLE TANIŞIN',
    'trainers.cta': 'DETAY',
    'trainers.t1.desc': '10 yılı aşkın tecrübesiyle pilates ve hareket bilimi üzerine uzmanlaşmıştır.',
    'trainers.t2.desc': 'Klinik pilates ve postür analizi konularında uzman, reformer eğitmeni.',
    'trainers.t3.desc': 'Fonksiyonel antrenman ve kuvvet gelişimi alanında profesyonel koç.',

    // Social Proof
    'social.title': 'FARKI HİSSEDİYORLAR.',
    'social.quote': 'Stüdyoya ilk adım attığım günden beri bedenimdeki değişimi sadece ben değil, herkes fark ediyor. Klasik bir spor salonundan çok daha fazlası; gerçekten premium bir deneyim.',

    // Instagram Grid
    'ig.title': 'STÜDYODAN KARELER',
    'ig.quote.p1': 'BEDENİNE ',
    'ig.quote.p2': 'İYİ BAK',
    'ig.quote.p3': '.<br/>YAŞAMAK ZORUNDA OLDUĞUN TEK YER ',
    'ig.quote.p4': 'ORASI',
    'ig.quote.p5': '.',
    'ig.cta': "INSTAGRAM'I KEŞFET",

    // WhatsApp
    'wa.defaultMessage': 'Merhaba, stüdyonuz ve dersleriniz hakkında bilgi almak istiyorum.',

    // Conversion Form
    'form.title': 'İLK DERSİNİ PLANLA',
    'form.subtitle': 'Sana en uygun programı bulalım.',
    'form.step1.title': 'NEYİ ARIYORSUN?',
    'form.step1.opt1': 'Pilates',
    'form.step1.opt2': 'Fitness',
    'form.step1.opt3': 'Reformer',
    'form.step1.opt4': 'Personal Training',
    'form.step1.opt5': 'Emin değilim',
    'form.step2.title': 'HEDEFİN?',
    'form.step2.opt1': 'Postür',
    'form.step2.opt2': 'Kilo kontrolü',
    'form.step2.opt3': 'Güçlenme',
    'form.step2.opt4': 'Esneklik',
    'form.step2.opt5': 'Kondisyon',
    'form.step2.opt6': 'Genel sağlık',
    'form.step3.title': 'DENEYİMİN?',
    'form.step3.opt1': 'Yeni başlıyorum',
    'form.step3.opt2': 'Biraz deneyimliyim',
    'form.step3.opt3': 'İleri seviyedeyim',
    'form.step4.title': 'İLETİŞİM BİLGİLERİN',
    'form.input.name': 'Ad Soyad',
    'form.input.phone': 'Telefon Numaranız',
    'form.input.message': 'Eklemek istediğiniz bir mesajınız var mı?',
    'form.btn.back': 'GERİ',
    'form.btn.next': 'DEVAM ET',
    'form.btn.submit': 'TALEBİMİ GÖNDER',
    'form.success.title': 'TEŞEKKÜRLER!',
    'form.success.desc': 'Talebiniz bize ulaştı. En kısa sürede sizinle iletişime geçeceğiz.',

    // Location & Footer
    'loc.title': 'DENGEYİ BUL.',
    'loc.address.label': 'ADRES',
    'loc.address.val': 'Yavuz Sultan Selim, Nergiz Cd.,<br/>41780 Körfez/Kocaeli',
    'loc.hours.label': 'ÇALIŞMA SAATLERİ',
    'loc.hours.val': 'Pzt - Cuma: 07:00 - 22:00<br/>Cmt - Pzr: 09:00 - 18:00',
    'loc.contact.label': 'İLETİŞİM',

    'footer.title.1': 'DAHA GÜÇLÜ.',
    'footer.title.2': 'BİRLİKTE.',
    'footer.title.3': 'HAREKET ET.',
    'footer.rights': 'Tüm hakları saklıdır.',
    'footer.created': 'Antigravity tarafından oluşturuldu',

    // Floating WhatsApp
    'wa.text': 'BİZE ULAŞ',
  },
  en: {
    // Navigation
    'nav.services': 'SERVICES',
    'nav.schedule': 'SCHEDULE',
    'nav.about': 'ABOUT US',
    'nav.trainers': 'TRAINERS',
    'nav.book': 'BOOK A CLASS',

    // Hero
    'hero.subtitle': 'Pilates · Fitness · Personal Training',
    'hero.title': 'MOVE<br />DIFFERENT.',
    'hero.desc': 'An experience that strengthens your body, transforms your movement, and makes the time you dedicate to yourself truly valuable.',
    'hero.cta.primary': 'PLAN YOUR FIRST CLASS',
    'hero.cta.secondary': 'EXPLORE STUDIO',

    // MovementTypes
    'move.title': 'WHICH MOVEMENT IS YOURS?',
    'move.pilates.title': 'PILATES',
    'move.pilates.desc': 'Fluid movements focused on balance, flexibility, and core strength.',
    'move.fitness.title': 'FITNESS',
    'move.fitness.desc': 'Specialized workouts for power, conditioning, and endurance.',
    'move.reformer.title': 'REFORMER',
    'move.reformer.desc': 'Dynamic pilates combining resistance and control.',
    'move.discover': 'DISCOVER',

    // GoalSelector
    'goal.title': 'CHOOSE YOUR GOAL',
    'goal.flexibility': 'FLEXIBILITY',
    'goal.strength': 'STRENGTH',
    'goal.posture': 'POSTURE',
    'goal.flex.title': 'A More Flexible Body',
    'goal.flex.desc': 'Increase your joint mobility, lengthen your muscles, and expand your range of motion in daily life with mat pilates and specialized reformer sessions.',
    'goal.str.title': 'A Stronger You',
    'goal.str.desc': 'Increase your muscle mass and maximize your physical capacity with personalized fitness programs and weight training.',
    'goal.post.title': 'Perfect Posture',
    'goal.post.desc': 'Get rid of desk pains and achieve an upright posture with a clinical pilates approach centered on spine health.',

    // SchedulePreview
    'schedule.title': 'TODAY IN THE STUDIO',
    'schedule.capacity': 'Capacity: 8 People',
    'schedule.capacity5': 'Capacity: 5 People',
    'schedule.free': 'Free Area',
    'schedule.pt': 'One-on-One',
    'schedule.cta': 'VIEW CLASS',

    // BrandStory
    'story.title': 'MOVEMENT IS<br />MORE THAN<br />EXERCISE.',
    'story.p1': 'At Nalan Sarı Pilates & Fitness, we offer not just a gym where you sweat, but a living space where you renew your body and mind.',
    'story.p2': 'Every individual\'s anatomy, goal, and story are different. That\'s why, instead of standard programs, we promise a completely tailored experience based on scientific foundations. Every minute you spend with us is the most valuable investment you make in yourself.',

    // Journey
    'journey.title': 'YOUR JOURNEY',
    'journey.step1.title': '01 INTRODUCTION',
    'journey.step1.desc': 'We listen to your goals, health history, and expectations, and map out the most suitable roadmap for you.',
    'journey.step2.title': '02 ANALYSIS',
    'journey.step2.desc': 'Through posture and body composition analysis, we scientifically determine your body\'s needs.',
    'journey.step3.title': '03 MOVEMENT',
    'journey.step3.desc': 'With your personalized program, you start breaking a sweat in the studio and discovering your limits.',
    'journey.step4.title': '04 TRANSFORMATION',
    'journey.step4.desc': 'You feel the physical and mental change, reaching a stronger and more balanced version of yourself.',

    // StudioExperience
    'studio.title': 'EXPLORE OUR STUDIO',
    'studio.pilates': 'Pilates Area',
    'studio.pilates.desc': 'Reformer and Cadillac equipment.',
    'studio.fitness': 'Fitness Area',
    'studio.fitness.desc': 'Free weights and cardio area.',
    'studio.pt': 'Personal Training',
    'studio.pt.desc': 'Private studio for one-on-one sessions.',

    // Services
    'services.pilates.desc': 'Core-focused basic pilates practice performed on a mat using your own body weight.',
    'services.pilates.who': 'Anyone who wants to improve their posture and strengthen their core.',
    'services.pilates.benefits': 'Improved Posture, Core Strength, Flexibility',
    
    'services.fitness.desc': 'Targeted strength and conditioning workouts with modern equipment and free weights.',
    'services.fitness.who': 'Those who want to increase muscle mass, burn fat, and improve overall conditioning.',
    'services.fitness.benefits': 'Muscle Strength, Cardiovascular Health, Endurance',

    'services.reformer.desc': 'Dynamic pilates exercises performed with spring resistance using specialized Reformer equipment.',
    'services.reformer.who': 'Those looking for a low-impact but high-intensity full-body workout.',
    'services.reformer.benefits': 'Balanced Muscle Development, Joint Mobility, Toning',

    'services.pt.desc': 'One-on-one training designed according to your personal goals, body analysis, and schedule.',
    'services.pt.who': 'Those with specific goals, in rehabilitation, or wanting to get maximum efficiency.',
    'services.pt.benefits': 'Personalized Program, One-on-One Motivation, Fast Results',

    'services.label.who': 'Who is it for:',
    'services.label.benefits': 'Benefits:',
    'services.cta': 'SEE DETAILS',

    // Trainers
    'trainers.title': 'MEET YOUR TRAINERS',
    'trainers.cta': 'DETAILS',
    'trainers.t1.desc': 'Specialized in pilates and movement science with over 10 years of experience.',
    'trainers.t2.desc': 'Reformer instructor, specialized in clinical pilates and posture analysis.',
    'trainers.t3.desc': 'Professional coach in functional training and strength development.',

    // Social Proof
    'social.title': 'THEY FEEL THE DIFFERENCE.',
    'social.quote': 'Since the first day I stepped into the studio, not only I but everyone notices the change in my body. Much more than a classic gym; a truly premium experience.',

    // Instagram Grid
    'ig.title': 'FROM THE STUDIO',
    'ig.quote.p1': 'MIND YOUR ',
    'ig.quote.p2': 'BODY',
    'ig.quote.p3': '.<br/>IT IS THE ONLY PLACE YOU HAVE TO ',
    'ig.quote.p4': 'LIVE',
    'ig.quote.p5': '.',
    'ig.cta': 'EXPLORE INSTAGRAM',

    // WhatsApp
    'wa.defaultMessage': 'Hello, I would like to get information about your studio and classes.',

    // Conversion Form
    'form.title': 'PLAN YOUR FIRST CLASS',
    'form.subtitle': 'Let\'s find the best program for you.',
    'form.step1.title': 'WHAT ARE YOU LOOKING FOR?',
    'form.step1.opt1': 'Pilates',
    'form.step1.opt2': 'Fitness',
    'form.step1.opt3': 'Reformer',
    'form.step1.opt4': 'Personal Training',
    'form.step1.opt5': 'Not sure',
    'form.step2.title': 'YOUR GOAL?',
    'form.step2.opt1': 'Posture',
    'form.step2.opt2': 'Weight control',
    'form.step2.opt3': 'Strength',
    'form.step2.opt4': 'Flexibility',
    'form.step2.opt5': 'Conditioning',
    'form.step2.opt6': 'General health',
    'form.step3.title': 'YOUR EXPERIENCE?',
    'form.step3.opt1': 'Beginner',
    'form.step3.opt2': 'Some experience',
    'form.step3.opt3': 'Advanced',
    'form.step4.title': 'CONTACT INFO',
    'form.input.name': 'Full Name',
    'form.input.phone': 'Phone Number',
    'form.input.message': 'Do you have any additional message?',
    'form.btn.back': 'BACK',
    'form.btn.next': 'CONTINUE',
    'form.btn.submit': 'SUBMIT REQUEST',
    'form.success.title': 'THANK YOU!',
    'form.success.desc': 'Your request has been received. We will contact you shortly.',

    // Location & Footer
    'loc.title': 'FIND YOUR BALANCE.',
    'loc.address.label': 'ADDRESS',
    'loc.address.val': 'Yavuz Sultan Selim, Nergiz Cd.,<br/>41780 Körfez/Kocaeli',
    'loc.hours.label': 'WORKING HOURS',
    'loc.hours.val': 'Mon - Fri: 07:00 - 22:00<br/>Sat - Sun: 09:00 - 18:00',
    'loc.contact.label': 'CONTACT',

    'footer.title.1': 'MOVE.',
    'footer.title.2': 'STRONGER.',
    'footer.title.3': 'TOGETHER.',
    'footer.rights': 'All rights reserved.',
    'footer.created': 'Created by Antigravity',

    // Floating WhatsApp
    'wa.text': 'CONTACT US',
  }
};

export type TranslationKey = keyof typeof dictionaries.tr;
