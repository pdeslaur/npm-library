package utils

import "syscall/js"

func Promise(fn func(args []js.Value) (js.Value, error)) js.Func {
	return js.FuncOf(func(this js.Value, args []js.Value) interface{} {
		handler := js.FuncOf(func(this js.Value, pargs []js.Value) interface{} {
			resolve := pargs[0]
			reject := pargs[1]

			go func() {
				r, err := fn(args)
				if err != nil {
					reject.Invoke(err.Error())
				} else {
					resolve.Invoke(r)
				}
			}()

			return nil
		})
		defer handler.Release()

		return js.Global().Get("Promise").New(handler)
	})
}
