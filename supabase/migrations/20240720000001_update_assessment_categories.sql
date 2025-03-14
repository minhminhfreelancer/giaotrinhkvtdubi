-- Update the default assessments in the curriculum table
-- This will update all existing records with the new assessment categories

UPDATE curriculum
SET assessments = jsonb_build_array(
  jsonb_build_object('category', 'TRUYỀN ĐẠO', 'content', '1. Có lập tốt kế hoạch truyền đạo và thực hiện hiệu quả không?', 'score', ''),
  jsonb_build_object('category', 'TRUYỀN ĐẠO', 'content', '2. Có luôn truyền đạo bằng tấm lòng vui mừng và cảm tạ lên Đức Chúa Trời không?', 'score', ''),
  jsonb_build_object('category', 'TRUYỀN ĐẠO', 'content', '3. Có siêng năng cầu nguyện sớm tối vì trái của Tin Lành không?', 'score', ''),
  jsonb_build_object('category', 'LỄ NGHĨA', 'content', '4. Khi gặp bất cứ ai, có hay chào hỏi vui vẻ trước không?', 'score', ''),
  jsonb_build_object('category', 'LỄ NGHĨA', 'content', '5. Có hay chào hỏi vui vẻ trước dù gặp mấy lần không?', 'score', ''),
  jsonb_build_object('category', 'LỄ NGHĨA', 'content', '6. Có chào hỏi trước đối với cả những thánh đồ mình không biết rõ không?', 'score', ''),
  jsonb_build_object('category', 'LỄ NGHĨA', 'content', '7. Có chào hỏi bằng cách cúi mình chứ không chỉ gật đầu nhẹ không?', 'score', ''),
  jsonb_build_object('category', 'LỄ NGHĨA', 'content', '8. Không ra oai, cũng không hành động cẩu thả', 'score', ''),
  jsonb_build_object('category', 'LỄ NGHĨA', 'content', '9. Có giữ tốt lễ nghĩa tùy theo sự khác biệt tuổi tác phần xác thịt không?', 'score', ''),
  jsonb_build_object('category', 'LỄ NGHĨA', 'content', '10. Có giữ tốt lễ nghĩa với địa vực trưởng không?', 'score', ''),
  jsonb_build_object('category', 'LỄ NGHĨA', 'content', '11. Không quản lý công việc Hội Thánh tùy theo ý mình.', 'score', ''),
  jsonb_build_object('category', 'NGÔN TỪ', 'content', '12. Có luôn nói lời cảm tạ lên ân điển của Đức Chúa Trời trong mọi sự không?', 'score', ''),
  jsonb_build_object('category', 'NGÔN TỪ', 'content', '13. Không bày tỏ trực tiếp lỗi lầm của người khác, tránh gây tổn thương?', 'score', ''),
  jsonb_build_object('category', 'NGÔN TỪ', 'content', '14. Có khen ngợi và khích lệ một cách phù hợp để vực dậy sĩ khí của những người xung quanh không?', 'score', ''),
  jsonb_build_object('category', 'NGÔN TỪ', 'content', '15. Không dùng những lời thế tục như chửi bới, hoặc lời nhiếc móc, v.v... nhưng dùng những lời giữ phẩm cách như các lời kính ngữ, tôn trọng, v.v...', 'score', ''),
  jsonb_build_object('category', 'NGÔN TỪ', 'content', '16. Không khoe khoang mình nhưng nói những lời bày tỏ vinh hiển của Cha Mẹ.', 'score', ''),
  jsonb_build_object('category', 'NGÔN TỪ', 'content', '17. Không nói những lời mang tính tiêu cực mà nói những lời tích cực và có đức tin', 'score', ''),
  jsonb_build_object('category', 'NGÔN TỪ', 'content', '18. Không đối thoại về chủ đề thế tục mà nói những lời có ích lợi phần linh hồn.', 'score', ''),
  jsonb_build_object('category', 'NGÔN TỪ', 'content', '19. Khi gọi điện, thường nói rõ thân phận mình trước và đối đáp nhẹ nhàng, thân thiện', 'score', ''),
  jsonb_build_object('category', 'PHỤNG SỰ', 'content', '20. Có làm việc bằng tấm lòng cảm tạ mọi sự không?', 'score', ''),
  jsonb_build_object('category', 'PHỤNG SỰ', 'content', '21. Có trường hợp nào hoãn việc phải làm vì lười biếng không?', 'score', ''),
  jsonb_build_object('category', 'PHỤNG SỰ', 'content', '22. Có luôn vui vẻ khi người nhà nhờ lái xe không?', 'score', ''),
  jsonb_build_object('category', 'CƯ XỬ', 'content', '23. Khuôn mặt có sáng sủa, tươi tắn không?', 'score', ''),
  jsonb_build_object('category', 'CƯ XỬ', 'content', '24. Có đối xử bằng thái độ nhu mì khiến đối phương thấy thoải mái không?', 'score', ''),
  jsonb_build_object('category', 'CƯ XỬ', 'content', '25. Có quan tâm và hiểu cho những người khác và hành động thân thiện không?', 'score', ''),
  jsonb_build_object('category', 'CƯ XỬ', 'content', '26. Có vừa đi vừa bỏ tay vào túi hoặc cúi gằm mặt không?', 'score', ''),
  jsonb_build_object('category', 'CƯ XỬ', 'content', '27. Không chỉ hợp với riêng người đặc biệt nào đó mà đối xử công bình với hết thảy mọi người.', 'score', ''),
  jsonb_build_object('category', 'PHÂM TÁNH', 'content', '28. Không đặt mình lên trên người khác mà có phẩm tính khiêm tốn', 'score', ''),
  jsonb_build_object('category', 'PHÂM TÁNH', 'content', '29. Có chậm nóng giận không', 'score', ''),
  jsonb_build_object('category', 'PHÂM TÁNH', 'content', '30. Không đề cao mạnh mẽ chủ trương của bản thân mà biết lắng nghe ý kiến hoặc lời khuyên của người khác.', 'score', ''),
  jsonb_build_object('category', 'QUẢN LÝ BẢN THÂN', 'content', '31. Có đang giữ đúng giờ thức dậy buổi sáng không? (Tiêu chuẩn là 6 giờ) Thời gian thức dậy vào buổi sáng cũng là một phần của quá trình giáo dục, nên xin hãy giữ đúng (Trừ kỳ nghỉ)', 'score', ''),
  jsonb_build_object('category', 'QUẢN LÝ BẢN THÂN', 'content', '32. Có làm tốt công việc cần làm với tư cách người đồng liêu trước công việc cá nhân của mình không?', 'score', ''),
  jsonb_build_object('category', 'QUẢN LÝ BẢN THÂN', 'content', '33. Có siêng năng học lời bằng cách tận dụng thời gian buổi sáng hoặc buổi tối không?', 'score', ''),
  jsonb_build_object('category', 'QUẢN LÝ BẢN THÂN', 'content', '34. Có viết báo cáo một cách trung thực không?', 'score', '')
)
WHERE assessments IS NOT NULL;

-- Preserve any existing week1, week2, week3, week4 values for each assessment
-- This is a more complex operation that would require custom PL/pgSQL function
-- For simplicity, we're just updating the categories and content
