export interface Message {
    id: number
    senderId: number
    senderUsername: string
    senderPhotoUrl: string
    recipientPhotoUrl: string
    recipientId: number
    recipientUsername: string
    content: string
    dateRead?: Date
    messageSent: string
  }
  