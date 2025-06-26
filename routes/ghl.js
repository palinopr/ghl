const express = require('express');
const router = express.Router();
const ghlClient = require('../services/ghlClient');

router.get('/calendars', async (req, res) => {
  try {
    const calendars = await ghlClient.getCalendars();
    res.json(calendars);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
});

router.get('/calendars/:calendarId/availability', async (req, res) => {
  try {
    const { calendarId } = req.params;
    const { startDate, endDate, timezone } = req.query;
    
    if (!startDate || !endDate) {
      return res.status(400).json({ error: 'startDate and endDate are required' });
    }
    
    const availability = await ghlClient.getCalendarAvailability(
      calendarId,
      startDate,
      endDate,
      timezone
    );
    
    res.json(availability);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
});

router.get('/contacts', async (req, res) => {
  try {
    const contacts = await ghlClient.getContacts(req.query);
    res.json(contacts);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
});

router.get('/contacts/:contactId', async (req, res) => {
  try {
    const { contactId } = req.params;
    const contact = await ghlClient.getContact(contactId);
    res.json(contact);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
});

router.post('/appointments', async (req, res) => {
  try {
    const appointment = await ghlClient.createAppointment(req.body);
    res.json(appointment);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
});

router.get('/appointments', async (req, res) => {
  try {
    const appointments = await ghlClient.getAppointments(req.query);
    res.json(appointments);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
});

module.exports = router;