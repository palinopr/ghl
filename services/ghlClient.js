const axios = require('axios');

class GHLClient {
  constructor() {
    this.apiKey = process.env.GHL_API_KEY;
    this.baseURL = process.env.GHL_API_URL || 'https://rest.gohighlevel.com/v1';
    
    this.client = axios.create({
      baseURL: this.baseURL,
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json'
      }
    });
  }

  async getCalendars() {
    try {
      const response = await this.client.get('/calendars');
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getCalendarAvailability(calendarId, startDate, endDate, timezone = 'UTC') {
    try {
      const response = await this.client.get(`/calendars/${calendarId}/free-slots`, {
        params: {
          startDate,
          endDate,
          timezone
        }
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getContacts(params = {}) {
    try {
      const response = await this.client.get('/contacts', { params });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getContact(contactId) {
    try {
      const response = await this.client.get(`/contacts/${contactId}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async createAppointment(data) {
    try {
      const response = await this.client.post('/appointments', data);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getAppointments(params = {}) {
    try {
      const response = await this.client.get('/appointments', { params });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  handleError(error) {
    if (error.response) {
      return {
        status: error.response.status,
        message: error.response.data.message || 'GHL API Error',
        data: error.response.data
      };
    } else if (error.request) {
      return {
        status: 503,
        message: 'Unable to reach GHL API'
      };
    } else {
      return {
        status: 500,
        message: error.message
      };
    }
  }
}

module.exports = new GHLClient();