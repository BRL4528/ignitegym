import { Button as NativeButton, Text, IButtonProps } from 'native-base';

type Props = IButtonProps & {
  title: string;
  variant?: 'sollid' | 'outline'
}

export function Button({ title, variant = 'sollid',...rest }: Props) {
  return (
    <NativeButton
       w="full"
       h={14}
       bg={variant === "outline" ? "transparent" : "green.700"}
       borderWidth={variant === "outline" ? 1 : 0}
       borderColor="green.500"
       rounded="sm"
       _pressed={{
        bg: variant === "outline" ? "gray.500" : 'green.500'
       }}
      {...rest}
      >
      <Text
       color={ variant === 'outline' ? "green.500" : "white"}
       fontFamily="heading"
       fontSize="sm"
      >
        {title}
      </Text>
    </NativeButton>
  )
}