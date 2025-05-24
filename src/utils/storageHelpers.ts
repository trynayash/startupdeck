
// Developed by Yash Suthar – StartupDeck
import { supabase } from '@/integrations/supabase/client';

/**
 * Upload a file to the user's private storage area
 * @param file The file to upload
 * @param path The path within the user's folder (optional)
 * @returns The uploaded file data or null if failed
 */
export const uploadUserFile = async (file: File, path: string = ''): Promise<any> => {
  try {
    const user = supabase.auth.getUser();
    if (!user) {
      throw new Error('User not authenticated');
    }

    const userId = (await user).data.user?.id;
    if (!userId) {
      throw new Error('User ID not available');
    }

    // Construct file path with user ID as folder name for RLS
    const filePath = `${userId}/${path ? path + '/' : ''}${file.name}`;

    const { data, error } = await supabase
      .storage
      .from('user-assets')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: true
      });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error uploading file:', error);
    return null;
  }
};

/**
 * Get a list of files in the user's storage
 * @param path The path within the user's folder (optional)
 * @returns Array of files or empty array if failed
 */
export const getUserFiles = async (path: string = ''): Promise<any[]> => {
  try {
    const user = supabase.auth.getUser();
    if (!user) {
      throw new Error('User not authenticated');
    }

    const userId = (await user).data.user?.id;
    if (!userId) {
      throw new Error('User ID not available');
    }

    // List files in the user's folder
    const { data, error } = await supabase
      .storage
      .from('user-assets')
      .list(`${userId}/${path}`);

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error listing files:', error);
    return [];
  }
};

/**
 * Get a public URL for a file in the user's storage
 * @param path The full path to the file including user ID
 * @returns The public URL or null if failed
 */
export const getUserFileUrl = async (filePath: string): Promise<string | null> => {
  try {
    const { data } = await supabase
      .storage
      .from('user-assets')
      .createSignedUrl(filePath, 3600); // 1 hour expiry

    return data?.signedUrl || null;
  } catch (error) {
    console.error('Error getting file URL:', error);
    return null;
  }
};

/**
 * Delete a file from the user's storage
 * @param path The full path to the file including user ID
 * @returns Boolean indicating success
 */
export const deleteUserFile = async (filePath: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .storage
      .from('user-assets')
      .remove([filePath]);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error deleting file:', error);
    return false;
  }
};
