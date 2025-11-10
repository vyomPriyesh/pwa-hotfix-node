export const sendResponse = (res, code, message, success, payload, old) => {
    if (old) {
        return res.status(code).json({
            message: message,
            success: true,
            ...(payload && { data: payload }),
        });
    }
    else {
        if (success) {
            return res.status(code).json({
                message: message,
                success: true,
                ...(payload && { data:  payload } ),
            });
        } else {
            return res.status(code).json({
                success: false,
                error: {
                    error_message: message
                },
                ...(payload && { data: { result: payload } }),
            });
        }
    }
};