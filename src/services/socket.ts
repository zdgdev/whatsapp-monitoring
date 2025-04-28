// Mocked socket service for demonstration purposes
class SocketService {
  private connected: boolean = false;
  private eventHandlers: Record<string, Function[]> = {};
  
  init() {
    // Simulate connection
    setTimeout(() => {
      this.connected = true;
      this.trigger('connect');
    }, 1000);
    
    // Simulate random disconnects for demo purposes
    setInterval(() => {
      if (Math.random() > 0.9) {
        this.connected = false;
        this.trigger('disconnect');
        
        // Reconnect after a few seconds
        setTimeout(() => {
          this.connected = true;
          this.trigger('connect');
        }, 3000);
      }
    }, 30000);
  }
  
  isConnected() {
    return this.connected;
  }
  
  on(event: string, callback: Function) {
    if (!this.eventHandlers[event]) {
      this.eventHandlers[event] = [];
    }
    this.eventHandlers[event].push(callback);
  }
  
  off(event: string, callback: Function) {
    if (this.eventHandlers[event]) {
      this.eventHandlers[event] = this.eventHandlers[event].filter(
        handler => handler !== callback
      );
    }
  }
  
  trigger(event: string, ...args: any[]) {
    if (this.eventHandlers[event]) {
      this.eventHandlers[event].forEach(handler => handler(...args));
    }
  }
  
  emit(event: string, data: any) {
    // In a real application, this would send data to the server
    console.log(`Emitting ${event}:`, data);
  }
  
  disconnect() {
    this.connected = false;
    this.trigger('disconnect');
    this.eventHandlers = {};
  }
}

export const socketService = new SocketService();