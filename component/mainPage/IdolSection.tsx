import React, { useState } from "react";
import styles from "../../app/page.module.scss";
import Link from "next/link";
import { IdolData } from "@/app/admin/[category]/interface";
import Image from "next/image";

interface IdolSectionProps {
  idolData: IdolData[];
}

const IdolSection = ({ idolData }: IdolSectionProps) => {
  const slideImage = idolData?.slice(0, 30);

  return (
    <>
      <div className={styles.artistSection}>
        <article className={styles.articleContents}>
          <div className={styles.artistFontWrapper}>
            <div className={styles.mainTitle}>
              <p>60팀의 아티스트를</p>
              <p>최애인에서 만나볼 수 있어요</p>
            </div>
            <div className={styles.subTitle}>
              <p>지금 인기있는 아티스트들을 선택하고</p>
              <p>스케줄을 확인해서 나만의 스케줄을 만들어보세요</p>
            </div>
          </div>
          <ul className={styles.artistImageWrapper}>
            {slideImage?.map((data: any) => (
              <li className={styles.artistThumnail} key={data.pk}>
                <Link href={`calendar/${data.pk}`}>
                  <Image
                    className={styles.artistImage}
                    src={data?.idol_profile}
                    alt="아티스트 이미지"
                    width={200}
                    height={200}
                    loading="lazy"
                  />
                  <h3 className={styles.artistName}>{data.idol_name_kr}</h3>
                  <p className={styles.artistFont}>{data.idol_name_en}</p>
                </Link>
              </li>
            ))}
          </ul>
        </article>
      </div>
    </>
  );
};

export default IdolSection;
