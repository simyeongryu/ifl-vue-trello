// https://github.com/bevacqua/dragula
import dragula from "dragula";
import "dragula/dist/dragula.css";

const dragger = {
  init(container, options) {
    return dragula([...container], options);
  },

  sibling({ el, wrapper, candidates, type }) {
    const currentId = +el.dataset[`${type}Id`];
    let prev = null;
    let next = null;

    candidates.forEach(
      (el, idx, arr) => {
        const id = +el.dataset[`${type}Id`];
        if (id === currentId) {
          prev =
            idx > 0
              ? {
                id: +arr[idx - 1].dataset[`${type}Id`],
                pos: +arr[idx - 1].dataset[`${type}Pos`],
              }
              : null;

          next =
            idx < arr.length - 1
              ? {
                id: +arr[idx + 1].dataset[`${type}Id`],
                pos: +arr[idx + 1].dataset[`${type}Pos`],
              }
              : null;
        }
      }
    );

    return { prev, next };
  }
}

export default dragger;