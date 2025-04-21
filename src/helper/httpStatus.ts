export const getHttpStatus = (error: Error): number  => {
    switch (error.message) {
      case 'Invalid email password':
        return 401;
      case 'Data not found':
        return 404;
        case 'User has registered':
            return 400;
      default:
        return 500;
    }
  }
  
