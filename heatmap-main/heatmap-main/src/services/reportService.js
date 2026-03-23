import { supabase } from '../lib/supabaseClient'

export const reportService = {
  //  obtiene  los reportes Mapa/Heatmap
  async getReports() {
    const { data, error } = await supabase
      .from('reportes')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  //  reporte con imagen
  async createReport(reportData, imageFile) {
    let imageUrl = null;

    // Si hay una foto se sube al Bucket 
    if (imageFile) {
      const fileName = `${Date.now()}-${imageFile.name}`;
      const { data, error: uploadError } = await supabase.storage
        .from('reportes_fotos')
        .upload(fileName, imageFile);

      if (uploadError) throw uploadError;
      
      // URL pública de la foto
      const { data: publicUrlData } = supabase.storage
        .from('reportes_fotos')
        .getPublicUrl(fileName);
      
      imageUrl = publicUrlData.publicUrl;
    }

    // reporte en la tabla de PostgreSQL
    const { data, error } = await supabase
      .from('reportes')
      .insert([{ ...reportData, foto_url: imageUrl }]);

    if (error) throw error;
    return data;
  }
}