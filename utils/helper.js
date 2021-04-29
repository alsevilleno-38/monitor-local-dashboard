export const simulateLatency = (cb, latency=1500) => {
    if (latency > 0) {
        setTimeout(cb, latency);
    }
    else {
        cb();
    }
}