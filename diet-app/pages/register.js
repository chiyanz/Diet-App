import styles from '@/styles/shared.module.css';
import { AtSignIcon, LockIcon } from '@chakra-ui/icons';
import { Button, Heading, Input, InputGroup, InputLeftAddon, Link, Stack, Text } from '@chakra-ui/react';
import NextLink from "next/link";

export default function Register() {
    return <main className={styles.main}>
        <Stack spacing={4}>
            <Heading>Register</Heading>
            <InputGroup>
                <InputLeftAddon
                    pointerEvents="none"
                    children={<AtSignIcon />} />
                <Input placeholder="Username" name="username"></Input>
            </InputGroup>
            <InputGroup>
                <InputLeftAddon
                    pointerEvents="none"
                    children={<LockIcon />} />
                <Input placeholder="Password" name="password" type="password"></Input>
            </InputGroup>
            <InputGroup>
                <InputLeftAddon
                    pointerEvents="none"
                    children={<LockIcon />} />
                <Input placeholder="Confirm Password" name="confirm-password" type="password"></Input>
            </InputGroup>
            <Button>Register</Button>
            <Text>Already have an account? <NextLink href="/"><Link color="teal.500">Log in</Link></NextLink>
            </Text>
        </Stack>
    </main>
}