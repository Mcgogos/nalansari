/**
 * MERKEZİ BAKIM / BİLGİLENDİRME MODU KONTROLÜ
 * 
 * true  => Geçici bilgilendirme ekranı tüm ziyaretçilere gösterilir.
 * false => Orijinal web sitesi normal şekilde çalışır.
 */
export const MAINTENANCE_MODE = true;

/**
 * Site sahibinin ve teknik ekibin bakım modundayken de orijinal siteyi
 * görüntüleyebilmesi için URL parametresi (Örn: https://nalansari.com/?preview=admin)
 */
export const ADMIN_BYPASS_QUERY = 'preview';
export const ADMIN_BYPASS_VALUE = 'admin';
