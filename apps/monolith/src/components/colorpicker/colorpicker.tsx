import * as colorPicker from "@zag-js/color-picker";
import { normalizeProps, useMachine } from "@zag-js/solid";
import { createMemo, createSignal } from "solid-js";

export function ColorPicker() {
  const initialColor = "#3E805D";

  const [state, send] = useMachine(
    colorPicker.machine({
      id: "ColorPickerId",
      value: colorPicker.parse(initialColor),

      onValueChange: (details) => {
        const { value, valueAsString } = details;
        document.documentElement.style.setProperty(
          "--preview-picked-color",
          valueAsString,
        );
      },
      onValueChangeEnd: (details) => {
        let color = state.context.value;
        color = color.incrementChannel("alpha", 1);
        color = color.incrementChannel("brightness", 100);
        color = color.incrementChannel("saturation", 100);

        const { value, valueAsString } = details;
        document.documentElement.style.setProperty(
          "--picked-color",
          valueAsString,
        );
        document.documentElement.style.setProperty(
          "--saturated-color",
          color.toString("hex"),
        );
      },
    }),
  );

  const api = createMemo(() =>
    colorPicker.connect(state, send, normalizeProps),
  );

  return (
    <div>
      <div {...api().getRootProps()} style={{ display: "inline-block" }}>
        {/* Control panel - Always visible */}
        <div {...api().getControlProps()}>
          <div class="flex flex-col flex-justify-center">
            <button {...api().getTriggerProps()}></button>
          </div>
          <input {...api().getChannelInputProps({ channel: "hex" })} />
          {/* <input {...api().getChannelInputProps({ channel: "alpha" })} /> */}
        </div>

        {/* Actual color picker, hidden as default */}
        <div {...api().getPositionerProps()}>
          <div
            class="border border-green-500 w-40 h-96"
            {...api().getContentProps()}
          >
            {/* Color Area */}
            <div
              class="border border-yellow-500 w-40 h-28"
              {...api().getAreaProps()}
            >
              <div {...api().getAreaBackgroundProps()} />
              <div {...api().getAreaThumbProps()} />
            </div>

            {/* Color Slider */}
            <div
              {...api().getChannelSliderProps({ channel: "hue" })}
              class="border border-red-500 h-10"
            >
              <div {...api().getChannelSliderTrackProps({ channel: "hue" })} />
              <div {...api().getChannelSliderThumbProps({ channel: "hue" })} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
