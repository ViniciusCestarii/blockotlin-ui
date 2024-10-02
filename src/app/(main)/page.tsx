import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import Image from 'next/image'

export default function HomePage() {
  return (
    <main className="container mx-auto">
      <section>
        <h2 className="text-3xl font-bold ">Featured Products</h2>
        <article className="border rounded-md max-w-sm overflow-hidden">
          <Image
            src="data:image/webp;base64,UklGRiIMAABXRUJQVlA4IBYMAABwPQCdASqMAKkAPkUejESioaESyH7cKAREtIALZXljNi9Zf0PFpiZd4/7n8tfi1/T+Hvx2yff6T8uPQ/3zey/5r0C/af6l/vPSsmv/bn4nzU/8fynvnHsB/y/+5+i7pC+qf/V7i/82/tf/M7IfpHfsAif9uJge40Mp4OLa0HP7kUqlIPoJKneemGbsuKb5hofqEpJsV1db3Roaivl8FKECJ2wrMN+WfeqM6AAwcHHy6+LA48w5mRh7/75qGEnz/9Hdn7jW1wLQisbH7kwcyKfSdJM3A9+gdB9mIS9UU8ZiRDVrZJwp7DpuPY4lutTK06Yo+nvj687bqZYdnnLWvMOmgdkYxRJKZ62KgOSCuKpqObuMRNyggWG8O1f8e4/4ChrMTVKTlbJVCH93CJvq5VQfShRZWZQn/cw8qCWFqHFGk+fEhZ1sKXuxKgEiDoqgLxeBrGw4GUgiomlWEjNLfgoYBeNTqeYNyfubk6oMmrR8ULEfIJB25nNVMeLUSYOl7MONJmcXQovfJfNPS5aoy9cC+jmpNjQS7ho9TJ6K39WP9LmxhE+dsjNp7cP5mAHr4jtNzKCTxg0ilBOJtx5NKbqMnirg9N1vIpUkYz1GijTEndAI8i9O3aaCwyvIzlNz4JwGipX4ObxXqZP77UVadPcxiBd+AAD+/iSAEBHeGkgNU3wpBGNwtvq1uA309wYu/u0P7HdkjYjeabpn86qrD/Eb/7a6E3Q+16vJjJsq0z90VMyHf+5oZ3ovS1FqITJsngcBInOqWZdJdtJ1/p+h1t+/l/QilqCK+AOgwLldJmLcl+UWXkOJAjIqdy4JJiu15r5kQ5vbYnhv6sjNsLxOeTnEGwIDq9KEaTpZwMVROKJyXGA310KT+djeXg0oHqtdmb8B6Rhb01NnHE8WoY8J9/PURrac+F+ZoumtkSP/k4+sfR1y6Ky23O8xxhdP4DK4CO6t8sOUS7iiWQHETyEO1rwsibPZLwiQQZEFCggR7BAYH/aqqznG2B/soGJQIascMpMXl6PWTT3kPypmFbfWNKdQMyAhmBJS+vjsZWhKdQLqZly4k37d4KEbNRv+trttV07JBmW10F9Khiw8RTtAdW/C8Ht7yiob/IadYdrL5qXOruwhlU/3hUSVipZ7MjBWIISyOpw4P5V7johZWenFwzADW0DQN7P4DJSlfCAXi1s5JSc1S4yiMzw2UkDCls6nmE5gAj/pUpjtgNVAiCjzSX8Z8bPJF9e3okT9tSaa3+MQc/xczs4cvNQiZLGf1BQDsn0EA0mZewZgAJcfMap1DK7aCj+ccd4LqhuezSGSKXYwSeGbmmy2mMf2R3fIAfjvaS4myqrKMU8rfmCOkeipzNYg5xvqZ3AGPTwDgvJaX69pf99cb8zDgObnFs0lSPgk2b1ElML/RSBdf8XOcUi434NHiO6pnioIE312NntbJLuSYpM/gw/BZwRyMbNyrFy4lYYG0iKAuNHEIrt214w8Beaj020zQfXqw1/SdjtAixdIlxjxq9D6HW7B7dhCO7BIxnLIVsfQggOdtEqCWmp7tH78wgeNVbtbLdVfQ7Q4E9gDajZ29gJl3UgxDtmFeyCliWfrG98adqTsmNki4SwauJ//KhyeFfhtLD7ZCVLw3IGyP/7/oukQE72R/4t9TJrHBaO/rWRGA/lHuLky2d3bBuYpNYyEnfGY1v/ybYy7MP9SMbMOqt7HvbNC/jHwcdoIvXVzTmD0Bbn48lOiK9OCor950LHwfFbesPYPeo68hy8u4fsTGuGDt2p+35TG1GVSfufF5VbBBrHNR9Vmm8V5WzXhK0f2QkeKTFL9pyBriX1rPEx6dwmQnCAkAw9tfhI4Xzc5qJVpRAux6/0yKd0yuPOrv7Ge2sjtciDTznkA7ZyXz1hqsfXp+Uf5egf5GCW9lis8qIqYbw0wSKWouffYm0gp+yEoLnIEpkc6KYHeGAjSkCsOi22ULDZ7Oa9i7fkxNijeY9ZFIF1nVIO7WZwYfHgZvLhnpJWpem1X9ihHPsNXlIjxBw+fGbWd/qqvJiRiktXmJHj/kGClehG4qjJCvU3fnwIU8dVUNjbP4rFQsaErPj/EracMEZsZeI3LgNfcitOF6VrH5D68/unV0i8jheiQvEYilm1n9Pfim72O9vyWz2HSkOHeD+CA5RtU/JdenI0VxGabr4mDDGPJyRbMZIuST8hRoAj+dSVKeifBo1idM5aEttlV6APVhnf4LMlvMq4VdEbZE1VSFs4VO3zi59pJeUolHw6o/Qmt2NINfLgp7hkUB/E0YIiDVpFlDmNXMwBx8ZROVBnncSCmfUVelxO/Ow0JNH3AikWIlCaEV7q/qRBVGaXdNuWCh8mtaozJb4yHe0IcSXs0fdJCZ0fwOwRFDx6VOdMIbg698muW12X4Q8xKZNFADshmK6dp4ULo7I0by4wY+Otzq5Jkq/048ULIQiXOoTUw64wqAEQqvGEJ6F5qOmcDH/C87miyMy6ViDj+pK7dJzcN2bQw6NQSQRZwFB4nbnBSYYVI0Gb8KdpftEgC5GEy1qW0qSIuuZ66vYS3po3l0mDxtELO6PZEqNgMJQC29+iwKJDCExOEJjEr14jtZAtZ4k8AcEcuRccPbbtbiXLchCKtKV4arS5u88625nTm03+yIl+UnUlazqZ52/ZtkPMqFWlbm4mJywArDbolonxSeacSQ9C+3/GX9GIlbxBTP/vl5t0PsYeOIMLjuN+g0IBqwgCz2DsyXfIsv/UGY86uOfFj/GgbWL5Qv9p3luKTo9yJjo3c6Mz0/bvprp/qnoJ45Aemv2388Wcz9rm28mINTGhjijOy9fP0CS4/XobzBks5aEnaGn97ixgJy7mxNA2aibEUUuhiYmKxefxoVllfOF70RoFq7iaPdtVJ0wooeR8D8vhPcorNqfdMBVTOKp/fr6ZrIr/fLD2m7lqV/QTLK5B5MQ2s6GoOWi/wAwDZ6SZOLDpDur7g0oQeGrrSGqoV7tPF5O5KInOYkthlqdW0yiprB3swIDGZSBe2z2d3r8da8BuhV4RpBK/JeRaVHrEZwPsYJkLHw2eFwEirw9y62edEn83+3nuCN4u6z4U+Tm1Aua8CAspwcNHkBM/b+kjpITKsSk3L60GLAlwk/PH+E8ddTcattIrBFuCCT7g7P6UN+Ba5PlyJ2kirHm48nTEGrbiAO2J8ZqifsRpayTsyVh09gpYRblzVWn3FT/3wVsYjcD/m16Mn/YJR/v7/WQBqq2B7t+MX8/DL+226fxfdjyfxuz0eqREPV/Ec+gAV6lH+kRtmUdgFnkCwc2Ev4zDl6lsVLZgNKhCW858m95RQZr8eVjsjhmW3HIBrmj+0PIEmKTgYywCr1j5hU23T3BtbH848PWNCumV9SK3Vs0bYGFo//eHtTlABEP0Yk+sigGsuxL5dQ6PbBww/8RRq3ihb7nKAEpgzhB5AgDPV7Ii3OjrLH8UO4eZbOsBfMRtQeo0G+SmMVLB4s2mzxWKu0mHztwWXyQTCElKbEnv/HBSbQW12B/ozyHlkAvv8nd83k0eEwONeJm+0DypoxIH/lvDcpnbLDfcWAAzbRrpFhAfwK9iOvhSCVXtcG2Y2y9UVap6rsBoWK1Mq+mjNlu5rr+lJGuZyZXGHkMNbqwwul6FhH8NXq0l/GKpvAgFuvnBwqE0zj865w5lEp/sh4UOc0YxG/Fht70neqIbASzp2FpsxNgCIoNStiPL2j089okh1aaj/d1P4z7UeHaEo5cqH7ijMo1OfaDQ4U0HoQbOn4gi5vn2/6CKhRLd0Opt/e2coPnHm6ibkJ0d/+nPdoP3y5GUVecav0fmKM1ky3kZBw2aJTZEjUqgRMsOkbbd/Ko7iYvtdqNiSOZIERUI7hI4A3DnawYqx3BjENxGWL+K5Le62Y44NV2Evi3Bp+1xgRo6geOOcMHyLYcgQL4/stY2UVYru80RBeak0WEpg8as+KlixeJfglQ4S6M541DaerwHPHmV8TGq4IkqNGsdXmL4thZI/EG0b2ipCJ7c0QxukOgCSTW03/WXJdwG1fLab25crqTaZWinFbRI5TVb5IJbSqvSuCWPRvFCsJ8nK/WAKtgkivCVNUI0YZiiYV4P6MfFwAAAA"
            alt="Panela inox"
            width={384}
            height={160}
          />
          <div className="px-3 py-2">
            <h3 className="text-lg font-semibold">Panela inox</h3>
            <span className="font-bold text-3xl">
              <span className="sr-only">Price</span>
              R$100.00
            </span>
          </div>
        </article>
      </section>
    </main>
  )
}
