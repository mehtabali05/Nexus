import {api} from './api';
import { Meeting } from '../types';

const MeetingService = {
  // Fetch meetings for the logged-in user
  getMyMeetings: async (): Promise<Meeting[]> => {
    const response = await api.get('/meetings/me');
    return response.data;
  },

  // Create a new meeting request
  createMeeting: async (withUser: string, startTime: Date, durationMinutes: number = 30): Promise<Meeting> => {
    const endTime = new Date(startTime.getTime() + durationMinutes * 60000);
    const response = await api.post('/meetings', {
      withUser,
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString()
    });
    return response.data;
  },

  // Update status (Matches your PUT /:id/status route)
  updateStatus: async (
    meetingId: string,
    status: 'Accepted' | 'Rejected'
  ): Promise<{ message: string; meeting: Meeting }> => {
    const response = await api.put(`/meetings/${meetingId}/status`, { status });
    return response.data;
  }
};

export default MeetingService;