export class ResponseUtil {
  static success<T>(data: T, message?: string) {
    return {
      success: true,
      message: message || 'Operation successful',
      data,
    };
  }

  static error(message: string, errors?: any) {
    return {
      success: false,
      message,
      errors,
    };
  }
}

