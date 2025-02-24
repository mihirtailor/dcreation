const express = require("express");
const fileUpload = require("express-fileupload");
const cloudinary = require("../config/cloudinary");
const { connection } = require("../connection");

const router = express.Router();

router.post(
    "/upload",
    fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp/",
    }),
    async (req, res) => {
        try {
            if (!req.files || !req.files.image) {
                return res.status(400).json({ message: "No file uploaded" });
            }

            const file = req.files.image;
            const result = await cloudinary.uploader.upload(file.tempFilePath, {
                folder: "slider",
            });

            // Insert into MySQL database
            const query =
                "INSERT INTO sliders (image_url, public_id, title, description) VALUES (?, ?, ?, ?)";
            connection.query(
                query,
                [
                    result.secure_url,
                    result.public_id,
                    req.body.title || "Default Title",
                    req.body.description || "Default Description",
                ],
                (error, results) => {
                    if (error) throw error;
                    res.json({
                        id: results.insertId,
                        url: result.secure_url,
                        public_id: result.public_id,
                        message: "Image uploaded and saved successfully",
                    });
                }
            );
        } catch (error) {
            res.status(500).json({ message: "Upload failed", error });
        }
    }
);

// Get all slider images
router.get("/slider", (req, res) => {
    const query = "SELECT * FROM sliders ORDER BY order_number ASC";
    connection.query(query, (error, results) => {
        if (error) {
            res.status(500).json({
                message: "Failed to fetch slides",
                error: error.message,
            });
            return;
        }
        res.json(results);
    });
});

// Update slider details
router.put("/slider/:id", (req, res) => {
    const { title, description } = req.body;
    const query = "UPDATE sliders SET title = ?, description = ? WHERE id = ?";
    connection.query(
        query,
        [title, description, req.params.id],
        (error, results) => {
            if (error) throw error;
            res.json({ message: "Slider updated successfully" });
        }
    );
});

router.put("/slider/:id/image",
    fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp/",
    }),
    async (req, res) => {
        try {
            if (!req.files || !req.files.image) {
                return res.status(400).json({ message: "No file uploaded" });
            }

            // Get the old image public_id first
            const selectQuery = "SELECT public_id FROM sliders WHERE id = ?";
            connection.query(selectQuery, [req.params.id], async (error, results) => {
                if (error) throw error;
                if (results.length > 0) {
                    // Delete old image from Cloudinary
                    await cloudinary.uploader.destroy(results[0].public_id);

                    // Upload new image
                    const file = req.files.image;
                    const result = await cloudinary.uploader.upload(file.tempFilePath, {
                        folder: "slider",
                    });

                    // Update database with new image details
                    const updateQuery = "UPDATE sliders SET image_url = ?, public_id = ? WHERE id = ?";
                    connection.query(
                        updateQuery,
                        [result.secure_url, result.public_id, req.params.id],
                        (error, results) => {
                            if (error) throw error;
                            res.json({
                                message: "Image updated successfully",
                                url: result.secure_url,
                                public_id: result.public_id
                            });
                        }
                    );
                } else {
                    res.status(404).json({ message: "Slider not found" });
                }
            });
        } catch (error) {
            res.status(500).json({ message: "Image update failed", error });
        }
    }
);


// Delete slider image
router.delete("/slider/:id", async (req, res) => {
    try {
        // First get the public_id to delete from Cloudinary
        const selectQuery = "SELECT public_id FROM sliders WHERE id = ?";
        connection.query(
            selectQuery,
            [req.params.id],
            async (error, results) => {
                if (error) throw error;
                if (results.length > 0) {
                    // Delete from Cloudinary
                    await cloudinary.uploader.destroy(results[0].public_id);
                    // Delete from database
                    const deleteQuery = "DELETE FROM sliders WHERE id = ?";
                    connection.query(
                        deleteQuery,
                        [req.params.id],
                        (error, results) => {
                            if (error) throw error;
                            res.json({
                                message: "Slider deleted successfully",
                            });
                        }
                    );
                }
            }
        );
    } catch (error) {
        res.status(500).json({ message: "Delete failed", error });
    }
});

module.exports = router;
