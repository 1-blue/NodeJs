const router = require('express').Router();
const multer = require('multer');
const path = require('path');

const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, done) {
            console.log(`destination req: ${req}`);
            console.log(`destination file: ${JSON.stringify(file)}`);
            done(null, './uploads/');
        },
        filename(req, file, done) {
            console.log(`filename: ${JSON.stringify(file)}`);
            const ext = path.extname(file.originalname);
            done(null, path.basename(file.originalname, ext) + Date.now() + ext);
        }
    }),
    limits: { fileSize: 5 * 1024 * 1024 },
});

router.post('/', upload.single('image'), (req, res, next) => {
    console.log(`router.post : ${JSON.stringify(req.file)}`);
    console.log(`router.post : ${req.body.image}`);

    res.send(JSON.stringify(req.file));
});

router.post('/array', upload.array('image_array'), (req, res, next) => {
    console.log(`router.post : ${JSON.stringify(req.files)}`);

    res.send(JSON.stringify(req.files));
});

router.post('/images', upload.fields([{ name: 'image1' }, { name: 'image2' }]), (req, res, next) => {
    console.log(`router.post : ${JSON.stringify(req.files)}`);

    res.send(JSON.stringify(req.files));
});

module.exports = router;