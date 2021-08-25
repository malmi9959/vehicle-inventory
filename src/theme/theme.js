export const theme = {
  button: {
    primary: {
      base: "text-white bg-primary border border-transparent",
      active:
        "active:bg-red hover:bg-primary focus:ring focus:ring-primary-light",
      disabled: "opacity-50 cursor-not-allowed",
    },
  },
  modal: {
    base: "w-full px-6 py-4 overflow-hidden bg-white rounded-t-lg dark:bg-gray-800 sm:rounded-lg sm:m-4 sm:max-w-xl",
  },
  input: {
    base: "block w-full text-sm focus:outline-none dark:text-gray-300 leading-5 rounded-md",
    active:
      "focus:border-primary border-gray-300 dark:border-gray-600 focus:ring focus:ring-primary-light dark:focus:border-gray-600 dark:focus:ring-gray-300 dark:bg-gray-700",
    disabled: "cursor-not-allowed opacity-50 bg-gray-300 dark:bg-gray-800",
    valid:
      "border-green-600 dark:bg-gray-700 focus:border-green-400 dark:focus:border-green-400 focus:ring focus:ring-green-200 dark:focus:ring-green-200",
    invalid:
      "border-red-600 dark:bg-gray-700 focus:border-red-400 dark:focus:border-red-400 focus:ring focus:ring-red-200 dark:focus:ring-red-200",
    radio:
      "text-primary form-radio focus:border-primary focus:outline-none focus:ring focus:ring-primary-light focus:ring-offset-0 dark:focus:ring-gray-300",
    checkbox:
      "text-primary form-checkbox focus:border-primary focus:outline-none focus:ring focus:ring-primary-light focus:ring-offset-0 rounded dark:focus:ring-gray-300",
  },
};
