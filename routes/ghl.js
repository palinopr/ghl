const express = require('express');
const router = express.Router();
const GHLClient = require('../services/ghlClient');

// Create instance only when needed
let ghlClient = null;
const getGHLClient = () => {
  if (!ghlClient) {
    ghlClient = new GHLClient();
  }
  return ghlClient;
};

router.get('/calendars', async (req, res) => {
  try {
    const calendars = await getGHLClient().getCalendars();
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
    
    const availability = await getGHLClient().getCalendarAvailability(
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
    const contacts = await getGHLClient().getContacts(req.query);
    res.json(contacts);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
});

router.get('/contacts/:contactId', async (req, res) => {
  try {
    const { contactId } = req.params;
    const contact = await getGHLClient().getContact(contactId);
    res.json(contact);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
});

router.post('/appointments', async (req, res) => {
  try {
    const appointment = await getGHLClient().createAppointment(req.body);
    res.json(appointment);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
});

router.get('/appointments', async (req, res) => {
  try {
    const appointments = await getGHLClient().getAppointments(req.query);
    res.json(appointments);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
});

module.exports = router;