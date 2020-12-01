/**
 * ImageUploadController.js
 *
 * @description :: Server-side logic for managing ImageUploads.
 */
module.exports = {
  /**
   * ImageUploadController.update()
   */
  upload: (req, res) => {
    try {
        return res.status(201).json({
            message: 'File uploaded successfully'
        });
    } catch (error) {
        return res.status(500).json({
            message: error?.message ? error.message : 'File failed to upload'
        });
    }
  },
};
