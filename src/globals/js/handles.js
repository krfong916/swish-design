export default function(ToMix) {
  class Handles extends ToMix {
    handles = new Set();

    manage(handle) {
      this.handles.add(handle);
      return handle;
    }

    release() {
      this.handles.forEach(handle => {
        handle.release();
        this.handles.delete(handle);
      })
      return super.release();
    }
  }
  return Handles;
}
