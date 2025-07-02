import { type Dispatch, useRef, useState } from "react";
import { getCodeList, overwrite } from "country-list";
import { ChevronsUpDown, Check } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from "~/components/ui/command";
import { Popover, PopoverTrigger, PopoverContent } from "~/components/ui/popover";
import { cn } from "~/lib/utils";

overwrite([
  { code: "US", name: "United States" },
  { code: "GB", name: "United Kingdom" },
  { code: "TW", name: "Taiwan" },
  { code: "TZ", name: "Tanzania" },
  { code: "VN", name: "Vietnam" },
]);

export default function CountrySelect({
  country,
  setCountry,
  className,
  disabled = false,
}: {
  country?: string;
  setCountry: Dispatch<string | undefined>;
  className?: string;
  disabled?: boolean;
}) {
  const [countrySelectOpen, setCountrySelectOpen] = useState(false);
  const countrySelectListRef = useRef<HTMLDivElement>(null);
  const countrySelectScrollId = useRef<ReturnType<typeof setTimeout> | null>(null);

  const countries = Object.entries(getCodeList())
    .sort(([, a], [, b]) => a.localeCompare(b))
    .map(([code, name]) => ({
      value: code,
      label: name,
    }));

  return (
    <Popover open={countrySelectOpen} onOpenChange={setCountrySelectOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={countrySelectOpen}
          disabled={disabled}
          className={cn("justify-between bg-gray-200! text-gray-900!", className)}
        >
          {country ? countries.find((c) => c.value === country)?.label : "Select country..."}
          <ChevronsUpDown className="" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0" align="start">
        <Command>
          <CommandInput
            placeholder="Search country..."
            className="h-9"
            onValueChange={() => {
              // https://github.com/pacocoursey/cmdk/issues/233#issuecomment-2015998940
              clearTimeout(countrySelectScrollId.current!);
              countrySelectScrollId.current = setTimeout(() => {
                const div = countrySelectListRef.current;
                div?.scrollTo({ top: 0 });
              });
            }}
          />
          <CommandList ref={countrySelectListRef}>
            <CommandEmpty>No country found.</CommandEmpty>
            <CommandGroup>
              {countries.map((c) => (
                <CommandItem
                  key={c.value}
                  value={c.value}
                  keywords={[c.label]}
                  onSelect={(currentValue) => {
                    setCountry(currentValue === country ? "" : currentValue);
                    setCountrySelectOpen(false);
                  }}
                >
                  {c.label}
                  <Check className={cn("ml-auto", country === c.value ? "opacity-100" : "opacity-0")} />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
