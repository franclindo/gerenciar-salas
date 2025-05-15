const Lab = require("../models/Lab");
const PDFDocument = require("pdfkit");

const createLab = async (req, res) => {
    const { nome, descricao, capacidade } = req.body;
    if (!req.user) return res.status(401).json({ message: "Não autenticado." });
    if (!nome || !descricao || !capacidade) return res.status(400).json({ message: "Preencha todos os campos." });

    try {
        const lab = await Lab.create({
            nome,
            descricao,
            capacidade,
            user: req.user._id,
            foto: req.file ? {
                data: req.file.buffer,
                contentType: req.file.mimetype,
                nomeArquivo: req.file.originalname,
            } : undefined,
        });
        res.status(201).json(lab);
    } catch (error) {
        res.status(500).json({ message: "Erro ao cadastrar", error: error.message });
    }
};

const getLabs = async (req, res) => {
    try {
        const labs = await Lab.find().populate("user", "email");
        res.json(labs);
    } catch (err) {
        res.status(500).json({ message: "Erro ao buscar", error: err.message });
    }
};

const getLabsReport = async (req, res) => {
    try {
        const labs = await Lab.find();
        const doc = new PDFDocument();
        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", 'attachment; filename="relatorio_labs.pdf"');
        doc.pipe(res);

        labs.forEach((lab, i) => {
            doc.fontSize(16).text(`${i + 1}. ${lab.nome}`);
            doc.fontSize(12).text(`Descrição: ${lab.descricao}`);
            doc.text(`Capacidade: ${lab.capacidade}`);
            if (lab.foto && lab.foto.data) {
                try {
                    doc.image(lab.foto.data, { fit: [150, 150] });
                } catch { }
            }
            doc.addPage();
        });
        doc.end();
    } catch (err) {
        res.status(500).json({ message: "Erro ao gerar PDF", error: err.message });
    }
};

module.exports = { createLab, getLabs, getLabsReport };