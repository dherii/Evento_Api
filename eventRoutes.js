const express = require('express');
const router = express.Router();
const Event = require('./Event');
const Registration = require('./Registration');
const { validateEvent, validateRegistration } = require('./validationMiddleware');

// POST /events - Cria um novo evento
router.post('/events', validateEvent, async (req, res) => {
    try {
        const event = await Event.create(req.body);
        res.status(201).json(event);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar o evento.' });
    }
});

// GET /events - Lista os eventos com contagem de inscrições
router.get('/events', async (req, res) => {
    try {
        const events = await Event.findAll({
            include: Registration
        });
        
        // Mapeia os eventos para incluir a contagem (Desafio do Passo 4)
        const eventsWithCount = events.map(event => ({
            ...event.toJSON(),
            registrationCount: event.Registrations.length
        }));
        
        res.status(200).json(eventsWithCount);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar eventos.' });
    }
});

// POST /events/:id/register - Registra participante com regra de lotação
router.post('/events/:id/register', validateRegistration, async (req, res) => {
    try {
        const eventId = req.params.id;
        
        // Busca o evento pelo ID
        const event = await Event.findByPk(eventId);
        if (!event) {
            return res.status(404).json({ error: 'Evento não encontrado.' });
        }

        // Conta as inscrições existentes
        const currentRegistrationsCount = await Registration.count({ where: { eventId } });

        // Verifica capacidade
        if (currentRegistrationsCount >= event.capacity) {
            return res.status(403).json({ error: 'O evento está lotado.' });
        }

        // Cria o registro se houver vaga
        const registration = await Registration.create({
            ...req.body,
            eventId
        });

        res.status(201).json(registration);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao registrar participante.' });
    }
});

module.exports = router;